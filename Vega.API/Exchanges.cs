using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Binance.Net;
using Binance.Net.Objects;

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
        public async Task<List<Balance>> GetBalances()
        {
            var binance = new BinanceClient(APIKEY, APISEC);

            var account = await binance.GetAccountInfoAsync();
            var btcValue = await binance.GetPriceAsync("BTCUSDT");
            var balances = new List<Balance>();

            foreach(var balance in account.Data.Balances){
                if (balance.Total == 0 || balance.Asset == "BTC")
                    continue;
                
                var valueBTC = binance.GetPrice(balance.Asset + "BTC").Data.Price;
                var ThisBalance = new Balance() { 
                    Asset = balance.Asset,
                    Total = balance.Total,
                    CurrentValueBTC = binance.GetPrice(balance.Asset + "BTC").Data.Price,
                    CurrentValueUSD = valueBTC*btcValue.Data.Price
                }; 
                balances.Add(ThisBalance);
            }

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
