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

    }
}
