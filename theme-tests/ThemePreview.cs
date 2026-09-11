using System;
using System.Collections.Generic;

namespace HiAstra.Preview
{
    // C# 9+: properties, attributes, records, generics, and interpolation.
    public sealed class ThemePreview
    {
        private const int Limit = 3;
        public string Name { get; } = "HiAstra";
        public record Swatch(string Label, string Color);

        /// <summary>Format a few swatches for visual inspection.</summary>
        public IEnumerable<string> Render(IEnumerable<Swatch> swatches)
        {
            int index = 0;
            foreach (var swatch in swatches)
            {
                if (index >= Limit) yield break;
                yield return $"{Name}: {index++} / {swatch.Label}";
            }
        }

        [Obsolete("Use Render instead")]
        public string LegacyLabel() => Name;

        public static void Main()
        {
            var preview = new ThemePreview();
            bool enabled = true;
            var swatches = new[] { new Swatch("Mint", "#72E0B2") };
            if (enabled)
                foreach (string label in preview.Render(swatches))
                    Console.WriteLine(label);
        }
    }
}
