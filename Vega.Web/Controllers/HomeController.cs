using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vega.API;
using Vega.Svg;
using Vega.Web.Models;

namespace Vega.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [Route("sparklines/{filename?}")]
        public async Task<IActionResult> SVGIntercept(string filename) {
            var symbol = filename.ToLower().Replace(".svg", "").ToUpper();

            var exchanges = new Exchanges();
            var chart = await exchanges.GetChart(symbol);


            return File(chart, "image/svg+xml");
        }
        public async Task<IActionResult> About()
        {
            var exchanges = new Exchanges();

            var History = await exchanges.GetCoinHistory("XRP", "USDT");
            var ChartData = new List<KeyValuePair<long, double>>();

            foreach(var candle in History)
            {
                var pair = new KeyValuePair<long, double>(candle.Time.Ticks, (double)candle.Close);
                ChartData.Add(pair);
            }

            var Chart = new LineChart(ChartData);

           
            return View(Chart);
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
