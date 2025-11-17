/**
 * Monet Color Extraction System
 * Extracts dominant colors from images and generates Material Design 3 color schemes
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Extract dominant color from an image
 */
export async function extractDominantColor(imageUrl: string): Promise<RGB> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Scale down for performance
      const size = 100;
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;

      // Color counting
      const colorCount: { [key: string]: number } = {};

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Skip transparent pixels and very light/dark colors
        if (a < 128) continue;
        const brightness = (r + g + b) / 3;
        if (brightness > 240 || brightness < 15) continue;

        // Round colors to reduce variations
        const roundedR = Math.round(r / 10) * 10;
        const roundedG = Math.round(g / 10) * 10;
        const roundedB = Math.round(b / 10) * 10;

        const key = `${roundedR},${roundedG},${roundedB}`;
        colorCount[key] = (colorCount[key] || 0) + 1;
      }

      // Find most common color
      let maxCount = 0;
      let dominantColor = { r: 100, g: 100, b: 200 };

      for (const [color, count] of Object.entries(colorCount)) {
        if (count > maxCount) {
          maxCount = count;
          const [r, g, b] = color.split(',').map(Number);
          dominantColor = { r, g, b };
        }
      }

      resolve(dominantColor);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}

/**
 * Generate Material Design 3 color scheme from a source color
 */
export function generateMonetPalette(sourceColor: RGB) {
  const hsl = rgbToHsl(sourceColor);

  const palette = {
    primary: {
      main: rgbToHex(sourceColor),
      light: rgbToHex(hslToRgb({ ...hsl, l: Math.min(hsl.l + 20, 90) })),
      dark: rgbToHex(hslToRgb({ ...hsl, l: Math.max(hsl.l - 20, 10) })),
      container: rgbToHex(hslToRgb({ ...hsl, l: 90, s: Math.max(hsl.s - 20, 20) })),
      onContainer: rgbToHex(hslToRgb({ ...hsl, l: 10 })),
    },
    secondary: {
      main: rgbToHex(hslToRgb({ h: (hsl.h + 30) % 360, s: hsl.s * 0.8, l: hsl.l })),
      light: rgbToHex(hslToRgb({ h: (hsl.h + 30) % 360, s: hsl.s * 0.8, l: Math.min(hsl.l + 20, 90) })),
      dark: rgbToHex(hslToRgb({ h: (hsl.h + 30) % 360, s: hsl.s * 0.8, l: Math.max(hsl.l - 20, 10) })),
      container: rgbToHex(hslToRgb({ h: (hsl.h + 30) % 360, s: hsl.s * 0.5, l: 90 })),
    },
    tertiary: {
      main: rgbToHex(hslToRgb({ h: (hsl.h + 60) % 360, s: hsl.s * 0.6, l: hsl.l })),
      light: rgbToHex(hslToRgb({ h: (hsl.h + 60) % 360, s: hsl.s * 0.6, l: Math.min(hsl.l + 20, 90) })),
      dark: rgbToHex(hslToRgb({ h: (hsl.h + 60) % 360, s: hsl.s * 0.6, l: Math.max(hsl.l - 20, 10) })),
      container: rgbToHex(hslToRgb({ h: (hsl.h + 60) % 360, s: hsl.s * 0.4, l: 90 })),
    },
    neutral: {
      main: rgbToHex(hslToRgb({ h: hsl.h, s: 5, l: 50 })),
      light: rgbToHex(hslToRgb({ h: hsl.h, s: 5, l: 90 })),
      dark: rgbToHex(hslToRgb({ h: hsl.h, s: 5, l: 10 })),
    },
    neutralVariant: {
      main: rgbToHex(hslToRgb({ h: hsl.h, s: 10, l: 50 })),
      light: rgbToHex(hslToRgb({ h: hsl.h, s: 10, l: 90 })),
      dark: rgbToHex(hslToRgb({ h: hsl.h, s: 10, l: 10 })),
    },
  };

  return palette;
}

/**
 * Convert RGB to hex color
 */
function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Apply Monet color scheme to theme
 */
export async function applyMonetTheme(imageUrl: string) {
  try {
    const dominantColor = await extractDominantColor(imageUrl);
    const palette = generateMonetPalette(dominantColor);
    return palette;
  } catch (error) {
    console.error('Failed to extract Monet colors:', error);
    // Return default palette
    return generateMonetPalette({ r: 100, g: 100, b: 200 });
  }
}
