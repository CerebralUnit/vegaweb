using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Vega.Svg
{
    public class LineChart
    {
        public int PaddingLeft { get; set; }
        public int PaddingTop { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int FontSize { get; set; }

        public string Id { get; set; } 
        public string LineColor { get; set; }
        public string MarkerColor { get; set; }
        public string Shadow { get; set; }
        public string LabelHtml { get; set; }
        public string LabelColor { get; set; } 
        public string Background { get; set; }
        public string FilterHtml { get; set; }
        public string ChartPointsHtml { get; set; }

        public bool HasShadow { get; set; }
        public bool Filled { get; set; }
        public bool Smoothed { get; set; }
        public bool YAxisEnabled { get; set; }
        public bool XAxisEnabled { get; set; }
        public bool YAxisZero { get; set; }

        public LineChart()
        {
            Width        = 800;
            Height       = 250;
            LineColor    = "#000";
            MarkerColor  = "#000";
            LabelColor   = "#000";
            Smoothed     = false;
            FontSize     = 15;
            YAxisEnabled = true;
            XAxisEnabled = true;
            YAxisZero    = false;
            Filled       = false;
            Background   = "none";
            Shadow       = "none";
            FilterHtml   = "";
        }

        public string Render()
        {
            var Dir  = Directory.GetCurrentDirectory();
            var Path = String.Format("file:///{0}/svg.html", Dir);

            var HTML       = File.ReadAllText(Path);
            var ShadowHTML = String.Empty;
            var FillHTML   = String.Empty;
           
            if (HasShadow)
            {
                Path = String.Format("file:///{0}/shadow.html", Dir);
                ShadowHTML = File.ReadAllText(Path);
                ShadowHTML = ShadowHTML.Replace("shadow", Shadow);
                FilterHtml = "filter=\"url(#shadow)\"";
            }

            if (Filled)
            {
                Path = String.Format("file:///{0}/fill.html", Dir);

                FillHTML = File.ReadAllText(Path);
                FillHTML = FillHTML  
                            .Replace( "{{width}}",       Width.ToString()  )
                            .Replace( "{{height}}",      Height.ToString() )
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
                    .Replace( "{{gridLabels}}",  LabelHtml              )
                    .Replace( "{{fill}}",        FillHTML               );

            return HTML;
        } 
    }
}
