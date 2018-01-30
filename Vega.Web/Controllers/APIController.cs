using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Binance.Net.Objects;
using Microsoft.AspNetCore.Mvc;
using Vega.API;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Vega.Web.Controllers
{

    public class APIController : Controller
    {
        private static readonly DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        // GET: api/values
        [HttpGet]
        [Route("api/getrecenttransactions")]
        public async Task<List<Transaction>> RecentTransactions()
        {
            var exchanges = new Exchanges();
            var transactions = await exchanges.GetRecentBinanceTransactions();

            return transactions;
        }

        // GET: api/values
        [HttpGet]
        [Route("api/getaccountinfo")]
        public async Task<BinanceAccountInfo> AccountInfo()
        {
            var exchanges = new Exchanges();
            var accountInfo = await exchanges.GetAccountInfo();

            return accountInfo;
        }
        // GET: api/values
        [HttpGet]
        [Route("api/getbalances")]
        public async Task<List<Balance>> GetBalances()
        {
            var exchanges = new Exchanges();
            var balances = await exchanges.GetBalances();

            return balances;
        }

        // GET: api/values
        [HttpGet]
        [Route("api/getpriceattime")]
        public async Task<Dictionary<string, Dictionary<string, decimal>>> GetPriceAtTime([FromQuery] string symbol, [FromQuery] int timestamp )
        {
            var time = epoch.AddSeconds(timestamp);
            DateTimeOffset offset = DateTime.SpecifyKind(time, DateTimeKind.Utc);
            var exchanges = new Exchanges();
            var price = await exchanges.GetPriceAtTime(symbol, offset);

            return price;
        }
      
            [HttpGet]
        [Route("api/gettrades")]
        public async Task<Dictionary<string, List<Trade>>> GetTrades()
        {
            var exchanges = new Exchanges();
            var trades = await exchanges.GetTrades();

            return trades;
        }
        [HttpGet]
        [Route("api/getentryvalue")]
        public async Task<decimal> GetEntryValue()
        { 
            var exchanges = new Exchanges();
            var value = await exchanges.GetEntryValue();

            return value;
        }

        [HttpGet]
        [Route("api/getcoinyield")]
        public async Task<Dictionary<string, Yield>> GetCoinYield()
        {
            var exchanges = new Exchanges();
            var yield = await exchanges.GetCoinYield();

            return yield;
        }
        
    }
}
