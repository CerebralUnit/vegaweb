using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Vega.Svg
{
    public class LineChart : NeatChart
    { 
        
        public LineChart(List<KeyValuePair<long, double>> chartData)
        {
            
            Width        =  _origWidth = 400;
            Height       =  _origHeight = 50;
            LineColor    = "#1b73bb";
            MarkerColor  = "none";
            LabelColor   = "#000";
            Smoothed     = false;
            FontSize     = 4;
            YAxisEnabled = false;
            XAxisEnabled = false;
            YAxisZero    = false;
            Filled       = true;
            Background   = "none";
            Shadow       = "none";
            FilterHtml   = "";

            this.PaddingLeft = this.PaddingRight = this.FontSize / 2;
            this.PaddingTop = this.FontSize;
            this.PaddingBottom = this.FontSize * 1.5;

            this.setData(chartData);
        }

        public string Render()
        {
            var dir  = Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location);
            var p = Path.Combine(dir, @"neatchartstemplates\svg.html");

            var HTML       = File.ReadAllText(p);
            var ShadowHTML = String.Empty;
            var FillHTML   = String.Empty;
           
            if (HasShadow)
            {
                p = Path.Combine(dir, @"neatchartstemplates\shadow.html");
                ShadowHTML = File.ReadAllText(p);
                ShadowHTML = ShadowHTML.Replace("shadow", Shadow);
                FilterHtml = "filter=\"url(#shadow)\"";
            }

            if (Filled)
            {
                p = Path.Combine(dir, @"neatchartstemplates\fill.html");

                FillHTML = File.ReadAllText(p);
                FillHTML = FillHTML  
                            .Replace( "{{width}}",       Width.ToString()  )
                            .Replace( "{{height}}",      Height.ToString() )
                            .Replace( "{{origHeight}}",  _origHeight.ToString() )
                            .Replace( "{{origWidth}}",   _origWidth.ToString()  )
                            .Replace( "{{chartPoints}}", ChartPointsHtml   ) 
                            .Replace( "{{chartId}}",     Id                );
            }

            if(YAxisEnabled || XAxisEnabled)
            {

            }

            HTML = HTML
                    .Replace( "{{leftPadding}}", PaddingLeft.ToString() )
                    .Replace( "{{topPadding}}",  PaddingTop.ToString()  )
                    .Replace( "{{width}}",       Width.ToString()       )
                    .Replace( "{{height}}",      Height.ToString()      )
                    .Replace( "{{origHeight}}",  _origHeight.ToString() )
                    .Replace( "{{origWidth}}",   _origWidth.ToString()  )
                    .Replace( "{{markerColor}}", MarkerColor            )
                    .Replace( "{{lineColor}}",   LineColor              )
                    .Replace( "{{filter}}",      FilterHtml             )
                    .Replace( "{{gridLabels}}",  LabelHtml              )
                    .Replace( "{{fontSize}}",    FontSize.ToString()    )
                    .Replace( "{{shadow}}",      Shadow                 )
                    .Replace( "{{chartPoints}}", ChartPointsHtml        ) 
                    .Replace( "{{chartId}}",     Id                     )
                    .Replace( "{{shadowHtml}}",  ShadowHTML             )
                    .Replace( "{{filter}}",      FilterHtml             ) 
                    .Replace( "{{oneThirdFont}}",(FontSize/3).ToString())
                    .Replace( "{{fillHtml}}",    FillHTML               );

            return HTML;
        }


        public void setData(List<KeyValuePair<long, double>> chartData)
        {
            this.setWindow(chartData); // sets min, max, range, etc
            // we assume chartData is sorted by key and keys and values are all numeric
            double? previousY = null;
            long? previousX = null;

            var count = chartData.Count;
            var deltaX = this.XRange / count;
            var averageAbsSlope = 0d; // we will add all of them then divide to get an average

            var secants = new Dictionary<long, double>(); // slope between this point and the previous one
            var tangents = new Dictionary<long, double>(); // slope across the point

            foreach (var xy in chartData)
            {
                var x = xy.Key;
                var y = xy.Value;

                if (previousY.HasValue)
                {
                    averageAbsSlope += Math.Abs(xy.Value - previousY.Value); // just add up all the Y differences
                    secants[previousX.Value] = (xy.Value - previousY.Value) / deltaX;
                }

                if (x == this.XMax)
                    secants[x] = (y - previousY.Value) / deltaX;

                previousY = y;
                previousX = x;
            }
            averageAbsSlope /= this.YRange * deltaX; // turn this absolute-deltas total into a slope
            if (this.Smoothed)
            {
                // take all these slopes and average them with their neighbors
                // unless they change direction, then make them zero
                // also restrict them a bit when they are very different
                previousX = null;
                double? previousSecant = null;
                foreach ( var secantPair in secants)
                {
                    var x = secantPair.Key;
                    var secant = secantPair.Value;

                    if (previousSecant.HasValue)
                    {
                        tangents[x] = (secant + previousSecant.Value) / 2;
                        if (secant == 0 || previousSecant == 0 || secant * previousSecant <= 0)
                        {
                            tangents[x] = 0;
                        }
                        else
                        {
                            if (tangents[x] / previousSecant > 3)
                            {
                                tangents[x] = 3 * previousSecant.Value;
                            }
                            else if (tangents[x] / secant > 3)
                            {
                                tangents[x] = 3 * secant;
                            }
                        }
                    }
                    if (x == this.XMax)
                    {
                        tangents[x] = secant;
                    }
                    if (x == this.XMin)
                    {
                        tangents[x] = secant;
                    }
                    previousX = x;
                    previousSecant = secant;
                }
            }

            /*
            We want the height of the median y-delta to be the same as
              the width of one x-delta, which puts the median slope at
              45 degrees. This improves comprehension.
              http://vis4.net/blog/posts/doing-the-line-charts-right/
              */
            var aspectRatio = Math.Max(0.25, Math.Min(0.75, 1 / averageAbsSlope));
            if (this.Height == 0)
            {
                this.Height = Math.Floor(aspectRatio * this.Width);
            }
            this.LabelHtml = buildGridLabelXML();
            this.ChartPointsHtml = "M";

            if (this.Smoothed)
            {
                this.ChartPointsHtml += this.TransformX(this.XMin) + "," + this.TransformY(chartData.First(x => x.Key == this.XMin).Value);

                foreach (var pair in chartData) {
                    var x = pair.Key;
                    var y = pair.Value;

                    var controlX = deltaX / 3 / Math.Sqrt(1 + Math.Pow(tangents[x], 2));
                    var controlY = tangents[x] * controlX;

                    if (x != this.XMin) {
                        this.ChartPointsHtml += " S" +
                        this.TransformX(x - controlX) + "," +
                        this.TransformY(y - controlY) + " " +
                        this.TransformX(x) + "," +
                        this.TransformY(y);
                    }
                }
            } else {
                foreach (var pair in chartData) {
                    var x = pair.Key;
                    var y = pair.Value;

                    this.ChartPointsHtml +=  this.TransformX(x) + "," + this.TransformY(y) + " ";
                }
            }

            Id = Guid.NewGuid().ToString();

            this.Render();
        }
    }
}
