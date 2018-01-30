using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Binance.Net;
using Binance.Net.Objects;
using CryptoCompare;

namespace Vega.API
{
    public class BinanceTransactions
    {
        public List<Transaction> Trades { get; set; }
        public List<Transaction> Deposits { get; set; }
        public BinanceWithdrawalList Withdrawals { get; set; } 
    }

    public enum TransactionType {
        Trade,
        Deposit,
        Withdrawal
    }
    public class Yield
    {
        public decimal GainsUSD { get; set; }
        public decimal GainPercentage { get; set; }
        public decimal TotalEarned { get; set; }
        public decimal TotalSpent { get; set; }
        public decimal CurrentBalanceUSD { get; set; }
        public decimal CurrentCoinTotal { get; set; }
    }
    public class Trade
    {
        public bool IsBuy { get; set; }
        public string Asset { get; set; }
        public string BaseAsset { get; set; }
        public decimal Quantity { get; set; } 
        public decimal Price { get; set; }
        public decimal PriceUSD { get; set; }
        public decimal TradeValueUSD { get; set; }
    }

    public class Transaction 
    {
        public string Id { get; set; }
        public decimal Price { get; set; }
        public decimal Qty { get; set; }
        public string Asset { get; set; }
        public string BaseAsset { get; set; }
        public DateTime Date { get; set; }
        public string Exchange { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string WalletAddress { get; set; }
    }

    public class Balance {
        public string Asset { get; set; }
        public decimal Total { get; set; }
        public decimal CurrentValueBTC { get; set; }
        public decimal CurrentValueUSD { get; set; }
    }
    public class Exchanges
    {
        public static DateTime FromUnixTime(long unixTime)
        {
            return epoch.AddSeconds(unixTime);
        }
        private static readonly DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        private const string APIKEY = "IaLcC8IpQQ20uLbvPiXS2jAzJwycuRPkFV95K4EsXZ7ERSDL9erRhRs1iEZaPf8X";
        private const string APISEC = "DC7e7sCKMhVIvyE404PctsaBcSZ2ZGR5INkdzOLQMDceNWTbyc7ZMmKj9PYuJBXy";

        public Exchanges()
        {
        }
        
        public async Task<Dictionary<string, Dictionary<string, decimal>>> GetPriceAtTime(string symbol, DateTimeOffset timestamp)
        {
            symbol = symbol.ToUpper();
            var client = new CryptoCompareClient();
            var conversions = new List<string>() {
                "ETH",
                "BTC",
                "USD",
                "EUR"
            };
            var priceList = await client.Prices.HistoricalAsync(symbol, conversions, timestamp);
            var prices = new Dictionary<string, Dictionary<string, decimal>>();

            foreach (var price in priceList[symbol])
            {
                if(!prices.ContainsKey(symbol))
                    prices.Add(symbol, new Dictionary<string, decimal>());
                 
                prices[symbol].Add(price.Key, price.Value); 
            }

            return prices;
        }
        public async Task<decimal> GetEntryValue()
        {
            var binance = new BinanceClient(APIKEY, APISEC);
            var depositsTask = await binance.GetDepositHistoryAsync();
            var priceTasks = new List<Task<Dictionary<string, Dictionary<string, decimal>>>>();
            
            foreach (var deposit in depositsTask.Data.List)
            {
              
                priceTasks.Add(GetPriceAtTime(deposit.Asset, deposit.InsertTime));
            }
             
            decimal total = 0 ;
            var prices = await Task.WhenAll(priceTasks);
            var priceDict = new Dictionary<string, Dictionary<string, decimal>>();
            foreach (var price in prices)
            {
                foreach(var keyVal in price)
                {
                    if(!priceDict.ContainsKey(keyVal.Key))
                        priceDict.Add(keyVal.Key, keyVal.Value);
                } 
            }
            foreach (var deposit in depositsTask.Data.List)
            {
                total += priceDict.ContainsKey(deposit.Asset) && priceDict[deposit.Asset].ContainsKey("USD") ? priceDict[deposit.Asset]["USD"] * deposit.Amount : 0;
            }
            return total; 
        }
        public async Task<Dictionary<string, Yield>> GetCoinYield()
        {
            var binance = new BinanceClient(APIKEY, APISEC);
            var account = await binance.GetAccountInfoAsync(); 
            account.Data.Balances = account.Data.Balances.Where(b => b.Total > 0).ToList();
            var yields = new Dictionary<string, Yield>();
            var trades = await GetTrades();

            foreach(var keyval in trades)
            {
                var symbol = keyval.Key;
                var inTotal = 0.0m;
                var outTotal = 0.0m;
                var currentValue = await GetPriceAtTime(symbol, DateTime.Now);
                var currentCount = account.Data.Balances.First(x => x.Asset == symbol).Total;
                var balance = currentCount * currentValue[symbol]["USD"];

                foreach(var trade in keyval.Value)
                {
                    if (trade.IsBuy)
                    {
                        inTotal += trade.TradeValueUSD;
                    }
                    else
                    {
                        outTotal += trade.TradeValueUSD;
                    }
                }
                var yield = (balance + outTotal) - inTotal;

                var totalYield = new Yield()
                {
                    CurrentBalanceUSD = currentValue[symbol]["USD"] * currentCount,
                    CurrentCoinTotal = currentCount,
                    GainPercentage = ((yield / inTotal)*100),
                    GainsUSD = yield,
                    TotalSpent = inTotal,
                    TotalEarned = outTotal + currentValue[symbol]["USD"]
                };
               
                yields.Add(symbol, totalYield);
            }
            return yields;
        }
        public async Task<Dictionary<string, List<Trade>>> GetTrades()
        {
            var binance = new BinanceClient(APIKEY, APISEC);

            var account = await binance.GetAccountInfoAsync();

            account.Data.Balances = account.Data.Balances.Where(b => b.Total > 0).ToList();

            var tradeTasks = new List<Task<BinanceApiResult<BinanceTrade[]>>>();
            var tradeAssets = new List<BinanceBalance>();
            var baseAssets = new List<string>();
            foreach (var balance in account.Data.Balances)
            {
                if (balance.Asset == "ETH" || balance.Asset == "BTC")
                    continue;

                tradeAssets.Add(balance);
                baseAssets.Add("ETH");
                tradeTasks.Add( binance.GetMyTradesAsync(balance.Asset + "ETH") );

                tradeAssets.Add(balance);
                baseAssets.Add("BTC"); 
                tradeTasks.Add( binance.GetMyTradesAsync(balance.Asset + "BTC") );
            }

            var Trades = await Task.WhenAll(tradeTasks);
            var TradeData = new Dictionary<string, List<Trade>>();
            var i = 0;
           

            foreach(var coin in Trades)
            {
                if (coin.Data == null || coin.Data.Count() == 0)
                {
                    i++; 
                    continue;
                }

                var asset = tradeAssets[i].Asset;

                if (!TradeData.ContainsKey(asset))
                    TradeData.Add(asset, new List<Trade>());

                foreach(var trade in coin.Data)
                {
                    var price = await GetPriceAtTime(baseAssets[i], trade.Time);
                    var USDVal = price[baseAssets[i]]["USD"];
                    var converted = new Trade()
                    {
                            Asset = asset,
                            BaseAsset = baseAssets[i],
                            IsBuy = trade.IsBuyer,
                            Price = trade.Price,
                            PriceUSD = USDVal,
                            Quantity = trade.Quantity,
                            TradeValueUSD = trade.Quantity * USDVal * trade.Price
                    };
                    TradeData[asset].Add(converted);
                }
            
                i++; 
            }

            return TradeData;
        }
        public async Task<List<Transaction>> GetRecentBinanceTransactions()
        {
            
            var binance  = new BinanceClient(APIKEY,APISEC);

            var Response = new BinanceTransactions();

            var account  = await binance.GetAccountInfoAsync();
            account.Data.Balances = account.Data.Balances.Where(b => b.Total > 0).ToList();
              
            var trades   = new Dictionary<string,List<BinanceTrade>>();
 
            var withdrawalTask = binance.GetWithdrawHistoryAsync();

            var depositsTask = binance.GetDepositHistoryAsync();
 
            var balances = account.Data.Balances;

            var series = Enumerable.Range(1, 5).ToList();

            var tasks = new List<Task<BinanceApiResult<BinanceTrade[]>>>();
            var myAssets = new List<string>();
            var baseAssets = new List<string>() { "ETH", "BTC" };

            foreach (var balance in balances)
            {
                if (balance.Total == 0)
                    continue;
                
                var asset = balance.Asset;

                myAssets.Add(asset);

                tasks.Add(binance.GetMyTradesAsync(asset + "ETH"));
                tasks.Add(binance.GetMyTradesAsync(asset + "BTC"));
            }

            var x = 0;
            var y = 0;
            var TradeTransactions = new List<Transaction>();

            foreach (var task in await Task.WhenAll(tasks))
            {
                if (task.Data != null && task.Data.Count() > 0)
                {
                    foreach(var trade in task.Data){

                        var transaction = new Transaction()
                        {
                            Asset = myAssets[y],
                            BaseAsset = x == 1 ? baseAssets[x] : baseAssets[x % 2],
                            Price = trade.Price,
                            Id = trade.Id.ToString(),
                            Date =trade.Time,
                            Qty = trade.Quantity,
                            Exchange = "Binance",
                            Type = Enum.GetName(typeof(TransactionType), TransactionType.Trade)
                        }; 
                        TradeTransactions.Add(transaction);
                    }
                  
                }

                x++;
                if (x % 2 == 0)
                    y++;
            }
       
            await Task.WhenAll(withdrawalTask, depositsTask);

            var DepositTransactions = new List<Transaction>();
            foreach(var deposit in depositsTask.Result.Data.List)
            {
                var transaction = new Transaction(){
                    Type = Enum.GetName(typeof(TransactionType), TransactionType.Deposit),
                    Qty = deposit.Amount,
                    Asset = deposit.Asset,
                    Date = deposit.InsertTime,
                    Status = deposit.Status.ToString(),
                    Exchange = "Binance"
                };
                DepositTransactions.Add(transaction);
            }
            var withdrawalTransactions = new List<Transaction>();
            foreach (var withdrawal in withdrawalTask.Result.Data.List)
            {
                var transaction = new Transaction()
                {
                    Type = Enum.GetName(typeof(TransactionType), TransactionType.Withdrawal),
                    Qty = withdrawal.Amount,
                    Asset = withdrawal.Asset,
                    Date = withdrawal.SuccessTime, 
                    Status = withdrawal.Status.ToString(),
                    Exchange = "Binance",
                    WalletAddress = withdrawal.Address
                };
                withdrawalTransactions.Add(transaction);
            }

            var allTransactions = new List<Transaction>();
            allTransactions.AddRange(DepositTransactions);
            allTransactions.AddRange(TradeTransactions);
            allTransactions.AddRange(withdrawalTransactions);
            allTransactions = allTransactions.OrderByDescending(t => t.Date).ToList();

            return allTransactions;
        }
        public async void GetEntryTotalForExchange()
        {
            var binance = new BinanceClient(APIKEY, APISEC);
     
            var accountTask = await binance.GetAccountInfoAsync();
        }
        public async Task<List<Balance>> GetBalances()
        {
            var binance = new BinanceClient(APIKEY, APISEC);

            var accountTask = binance.GetAccountInfoAsync();

            var btcValueTask = binance.GetPriceAsync("BTCUSDT");

            var balances = new List<Balance>();

            await Task.WhenAll(accountTask, btcValueTask);

            var priceTasks = new List<Task<BinanceApiResult<BinancePrice>>>();

            var valueBTC = btcValueTask.Result.Data.Price;

            var balanceResults = accountTask.Result.Data.Balances
                                                        .Where(b => b.Total > 0)
                                                        .ToDictionary(x => x.Asset + "BTC");
                

            Parallel.ForEach(balanceResults, (balance) =>{
                priceTasks.Add(binance.GetPriceAsync(balance.Value.Asset + "BTC"));
            });

            var i = 0;

            await Task.WhenAll(priceTasks); 

            Parallel.ForEach(priceTasks, (task) =>
            {
                var balanceResult = balanceResults[task.Result.Data.Symbol];

                var assetName = balanceResult.Asset;

                var ThisBalance = new Balance()
                {
                    Asset = assetName,
                    Total = balanceResult.Total,
                    CurrentValueBTC = task.Result.Data.Price,
                    CurrentValueUSD = valueBTC * task.Result.Data.Price
                };

                balances.Add(ThisBalance);

                i++; 
            });

            return balances;
        }
        public async Task<BinanceAccountInfo> GetAccountInfo(){
            var binance = new BinanceClient(APIKEY, APISEC);

            var account = await binance.GetAccountInfoAsync();

            return account.Data;
        }
        public void GetRecentTransanctions(){
            
        }
    }
}
