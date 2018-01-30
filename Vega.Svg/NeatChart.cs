using System;
using System.Collections.Generic;
using System.Text;

namespace Vega.Svg
{
    public class NeatChart
    {
        public double PaddingLeft { get; set; }
        public double PaddingTop { get; set; }
        public double PaddingRight { get; set; }
        public double PaddingBottom { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double FontSize { get; set; }

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
        public double YRange { get; set; }
        public double XRange { get; set; }
        public double YMax { get; set; }
        public double YMin { get; set; }
        public double XMin { get; set; }
        public double XMax { get; set; }
        public bool xAxisEnabled { get; set; }

        public string DisplayNDecimal(double dbValue, int nDecimal)
        {
            var decimalPoints = new StringBuilder("0");
            if (nDecimal > 0)
            {
                decimalPoints.Append(".");
                for (int i = 0; i < nDecimal; i++)
                    decimalPoints.Append("0");
            }
            return dbValue.ToString(decimalPoints.ToString());
        }

        protected double GetPrecision(double n)
        {
            // thanks http://stackoverflow.com/a/21788335/5402566 
            double v = n - Math.Floor(n); //get the decimal portion of the number

            return v == 0 ? v : v.ToString().Length - 1;
        }
        protected string LabelFormat(double Float, double places, double minPlaces = 0)
        {
            var value = DisplayNDecimal(Float, (int)Math.Max(minPlaces, places));
            // add a trailing space if there's no decimal
            return value.IndexOf('.') == -1 ? value + '.' : value;
        }
        protected double TransformY(double y)
        {
            return Math.Round((this.YMax - y) / this.YRange * this.Height, 2);
        }
        protected double TransformX(double x)
        {
            return Math.Round((x - this.XMin) / this.XRange * this.Width , 2);
        }
        protected void buildGridLabelXML(int width, int height)
        {
            this.Width = width - this.PaddingLeft - this.PaddingRight;
            this.Height = height - this.PaddingTop - this.PaddingBottom;
            var GridText = "";
            var GridLines = "";
            if (YAxisEnabled)
            {
                var NumYLabels = 4 + Math.Ceiling(this.Height / this.FontSize / 4);
                var LabelInterval = this.YRange / NumYLabels;
                var LabelModulation = Math.Pow(10, (1 + Math.Floor(-Math.Log((double)this.YRange / (double)NumYLabels, 10))));
                // 1 here is a fudge factor so we get multiples of 2.5 more often
                if ((LabelInterval * LabelModulation) % 2.5 < ((LabelInterval * LabelModulation) % 2) + 1)
                {
                    LabelModulation /= 2.5;
                }
                else
                {
                    LabelModulation /= 2;
                }
                LabelInterval = Math.Ceiling(LabelInterval * LabelModulation) / LabelModulation;
                var LabelPrecision = this.GetPrecision(LabelInterval);
                var DigitsLeft = Math.Max(1, Math.Ceiling(Math.Log(this.YMax, 10)));
                var Commas = Math.Max(0, Math.Floor((DigitsLeft - 1) / 3));
                this.PaddingLeft = this.FontSize * 0.65 * (
                  2.5 + DigitsLeft + Commas + this.GetPrecision(LabelInterval)
                );
                this.Width = width - this.PaddingLeft - this.PaddingRight;
                // Top and bottom grid lines
                GridLines += "M0 0 " + this.Width + " 0 " + " M0 " + this.Height + " L" + this.Width + " " + this.Height + " ";
                // Top and bottom grid labels
                GridText +=
                  "<text text-anchor=\"end\" x=\"" + (-0.4 * this.FontSize) + "\" y=\"" + (this.FontSize * 0.4) + "\">" + (this.LabelFormat(this.YMax, LabelPrecision + 1)) + "</text>" +
                "<text text-anchor=\"end\" x=\"" + (-0.4 * this.FontSize) + "\" y=\"" + (this.FontSize * 0.4 + this.Height) + "\">" + (this.LabelFormat(this.YMin, LabelPrecision + 1)) + "</text>";
                // Main labels and grid lines
                for (
                 var LabelY = this.YMin - (this.YMin % LabelInterval) + LabelInterval; // Start at the first \"nice\" Y value > min
                  LabelY < this.YMax; // Keep going until max
                  LabelY += LabelInterval // Add Interval each iteration
                )
                {
                    var LabelHeight = this.TransformY(LabelY);
                    if ( // label is not too close to the min or max
                      LabelHeight < this.Height - 1.5 * this.FontSize &&
                      LabelHeight > this.FontSize * 1.5
                    )
                    {
                        GridText += "<text text-anchor=\"end\" x=\"-" + (this.FontSize) + "\" y=\"" + (LabelHeight + this.FontSize * 0.4) + "\">" + this.LabelFormat(LabelY, LabelPrecision) + "</text>";
                        GridLines += " M-" + (this.FontSize * 0.65) + "," + LabelHeight + " " + this.Width + "," + LabelHeight;
                    }
                    else if ( // label is too close
                    LabelHeight < this.Height - this.FontSize * 0.75 &&
                    LabelHeight > this.FontSize * 0.75
                  )
                    {
                        GridLines += " M" + ( // move grid line over when it"s very close to the min or max label
                          LabelHeight < this.Height - this.FontSize / 2 && LabelHeight > this.FontSize / 2 ? 0 : this.FontSize / 2
                        ) + "," + LabelHeight + " " + this.Width + "," + LabelHeight;
                    }
                }
            }
            if (xAxisEnabled)
            {
                var TimeIntervals = new Dictionary<string, int>() {
                    { "minutes", 60 },
                    { "hours", 60 * 60},
                    { "days", 24 * 60 * 60},
                    { "years", 365 * 24 * 60 * 60 }
                };

                var TimeIntervalLabel = new Dictionary<string, string>() {
                    { "minutes", "g:ia" },
                    { "hours", "D ga"},
                    { "days", "M j"},
                    { "years", "Y" }
                };

                var NumXLabels = Math.Round(this.Width / this.FontSize / 12);
                var Scale = "years";
                var xLabelFormat = TimeIntervalLabel[Scale];

             
                foreach (var  KevVal in TimeIntervals) {
                    if (this.XRange / NumXLabels < KevVal.Value) 
                        break;

                    Scale = KevVal.Key;
                    xLabelFormat = TimeIntervalLabel[Scale]; 
                }

                var xLabelInterval = this.XRange / NumXLabels;

                xLabelInterval -=  xLabelInterval % TimeIntervals[Scale];

                for (  var labelX = this.XMin - (this.XMin % TimeIntervals[Scale]) + xLabelInterval;
                        labelX < this.XMax;
                        labelX += xLabelInterval
                    )
                {
                    var LabelXCoord = this.TransformX(labelX);
                    GridLines += "M" + LabelXCoord + " 0 " + LabelXCoord + " " + this.Height + " ";

                    var xLabelAlignment = (this.Width - LabelXCoord > this.FontSize* 2 ? (LabelXCoord > this.FontSize* 2 ? "middle" : "start") : "end");

                    if (this.Width - LabelXCoord > this.FontSize* 2) {
                        if (LabelXCoord > this.FontSize * 2)
                        {
                            GridText += "<text text-anchor=\"middle\" y=\"" + (this.Height + this.FontSize) + "\" x=\"" + LabelXCoord + "\">" + new DateTime((long) labelX) + "</text>";
                        }
                        else
                        {
                            GridText += "<text text-anchor=\"start\" y=\"" + (this.Height + this.FontSize) + "\" x=\"0\">" + new DateTime((long) labelX) + "</text>";
                        }
                    } else {
                        GridText += "<text text-anchor=\"end\" y=\"" + (this.Height + this.FontSize) + "\" x=\"" + this.Width + "\">" + new DateTime((long) labelX) + "</text>";
                    }
                }
            } 
            return;
        }
    }
}
