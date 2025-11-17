import { createTheme, ThemeOptions } from '@mui/material/styles';

/**
 * Material Design 3 Theme Configuration
 */

export const getTheme = (mode: 'light' | 'dark', monetPalette?: any) => {
  const defaultPrimary = {
    main: '#6750A4',
    light: '#9A82DB',
    dark: '#4F378B',
    container: '#EADDFF',
    onContainer: '#21005D',
  };

  const primary = monetPalette?.primary || defaultPrimary;
  const secondary = monetPalette?.secondary || {
    main: '#625B71',
    light: '#958DA5',
    dark: '#4A4458',
    container: '#E8DEF8',
  };
  const tertiary = monetPalette?.tertiary || {
    main: '#7D5260',
    light: '#A37F8D',
    dark: '#633B48',
    container: '#FFD8E4',
  };

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: primary.main,
        light: primary.light,
        dark: primary.dark,
        contrastText: mode === 'light' ? '#FFFFFF' : '#000000',
      },
      secondary: {
        main: secondary.main,
        light: secondary.light,
        dark: secondary.dark,
      },
      tertiary: {
        main: tertiary.main,
        light: tertiary.light,
        dark: tertiary.dark,
      } as any,
      background: {
        default: mode === 'light' ? '#FFFBFE' : '#1C1B1F',
        paper: mode === 'light' ? '#FFFFFF' : '#2B2930',
      },
      surface: mode === 'light' ? '#FFFBFE' : '#1C1B1F',
      surfaceVariant: mode === 'light' ? '#E7E0EC' : '#49454F',
      outline: mode === 'light' ? '#79747E' : '#938F99',
    },
    shape: {
      borderRadius: 12, // Material Design 3 uses larger radius
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      // Display styles
      displayLarge: {
        fontSize: '57px',
        fontWeight: 400,
        lineHeight: '64px',
        letterSpacing: '-0.25px',
      },
      displayMedium: {
        fontSize: '45px',
        fontWeight: 400,
        lineHeight: '52px',
      },
      displaySmall: {
        fontSize: '36px',
        fontWeight: 400,
        lineHeight: '44px',
      },
      // Headline styles
      h1: {
        fontSize: '32px',
        fontWeight: 400,
        lineHeight: '40px',
      },
      h2: {
        fontSize: '28px',
        fontWeight: 400,
        lineHeight: '36px',
      },
      h3: {
        fontSize: '24px',
        fontWeight: 400,
        lineHeight: '32px',
      },
      h4: {
        fontSize: '22px',
        fontWeight: 400,
        lineHeight: '28px',
      },
      h5: {
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '24px',
      },
      h6: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
      },
      // Body styles
      body1: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '0.5px',
      },
      body2: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: '0.25px',
      },
      // Label styles
      button: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '0.1px',
        textTransform: 'none' as const,
      },
      caption: {
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
        letterSpacing: '0.4px',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            textTransform: 'none',
            fontWeight: 500,
            padding: '10px 24px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light'
              ? '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)'
              : '0px 1px 2px rgba(0, 0, 0, 0.5), 0px 1px 3px 1px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

export default getTheme;
