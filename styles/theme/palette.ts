export type Palette = {
  readonly theme: {
    readonly default: string;
    readonly light: string;
    readonly dark: string;
    readonly magenta: string;
    readonly 'magenta-light': string;
    readonly 'magenta-dark': string;
    readonly cyan: string;
    readonly 'cyan-light': string;
    readonly 'cyan-dark': string;
    readonly pink: string;
    readonly 'pink-light': string;
    readonly 'pink-dark': string;
    readonly blue: string;
    readonly 'blue-light': string;
    readonly 'blue-dark': string;
    readonly red: string;
    readonly 'red-light': string;
    readonly 'red-dark': string;
    readonly green: string;
    readonly 'green-light': string;
    readonly 'green-dark': string;
    readonly yellow: string;
    readonly 'yellow-light': string;
    readonly 'yellow-dark': string;
    readonly purple: string;
    readonly 'purple-light': string;
    readonly 'purple-dark': string;
    readonly white: string;
    readonly black: string;
    readonly gray: string;
    readonly 'gray-light': string;
    readonly 'gray-dark': string;
    readonly 'gray-lightest': string;
    readonly 'gray-lighter': string;
    readonly 'gray-darker': string;
    readonly teal: string;
    readonly 'teal-light': string;
    readonly 'teal-dark': string;
    readonly orange: string;
    readonly 'orange-light': string;
    readonly 'orange-dark': string;
    readonly indigo: string;
    readonly 'indigo-light': string;
    readonly 'indigo-dark': string;
    readonly hover: {
      readonly theme: string;
      readonly accent: string;
      readonly globalAccent: string;
      readonly bgLight: string;
      readonly bgDark: string;
      readonly bgSecondaryLight: string;
      readonly bgSecondaryDark: string;
      readonly bgAccentLight: string;
      readonly bgAccentDark: string;
      readonly success: string;
      readonly warning: string;
      readonly error: string;
      readonly info: string;
    };
    readonly data: {
      readonly [key: string]: string;
    };
  }
}

export const palette: Palette = Object.freeze({
  theme: Object.freeze({
    default: '#1a73e8', // Updated to a more modern blue
    light: '#87b9f2',
    dark: '#0e4c91',
    magenta: '#d5008f',
    'magenta-light': '#ff5cc0',
    'magenta-dark': '#9c0076',
    cyan: '#00bcd4',
    'cyan-light': '#62e2f7',
    'cyan-dark': '#008ba3',
    pink: '#d81b60',
    'pink-light': '#f06292',
    'pink-dark': '#a10034',
    blue: '#2196f3',
    'blue-light': '#64b5f6',
    'blue-dark': '#1976d2',
    red: '#f44336',
    'red-light': '#ff7961',
    'red-dark': '#d32f2f',
    green: '#4caf50',
    'green-light': '#81c784',
    'green-dark': '#388e3c',
    yellow: '#ffeb3b',
    'yellow-light': '#fff59d',
    'yellow-dark': '#fbc02d',
    purple: '#9c27b0',
    'purple-light': '#ba68c8',
    'purple-dark': '#7b1fa2',
    white: '#ffffff',
    black: '#212121',
    gray: '#9e9e9e',
    'gray-light': '#e0e0e0',
    'gray-dark': '#616161',
    'gray-lightest': '#fafafa',
    'gray-lighter': '#f5f5f5',
    'gray-darker': '#424242',
    teal: '#009688',
    'teal-light': '#4db6ac',
    'teal-dark': '#00796b',
    orange: '#ff9800',
    'orange-light': '#ffb74d',
    'orange-dark': '#f57c00',
    indigo: '#3f51b5',
    'indigo-light': '#7986cb',
    'indigo-dark': '#303f9f',
    hover: Object.freeze({
      theme: '#1565c0',
      accent: '#0c3c72',
      globalAccent: '#ffb300',
      bgLight: '#f5f5f5',
      bgDark: '#263238',
      bgSecondaryLight: '#cfd8dc',
      bgSecondaryDark: '#37474f',
      bgAccentLight: '#80deea',
      bgAccentDark: '#01579b',
      success: '#388e3c',
      warning: '#f57c00',
      error: '#d32f2f',
      info: '#0288d1',
    }),
    data: Object.freeze({
      c1: '#4caf50',
      c2: '#ab47bc',
      c3: '#29b6f6',
      c4: '#ef5350',
      c5: '#ffca28',
      c6: '#ff7043',
      c7: '#8d6e63',
      c8: '#ffeb3b',
      c9: '#9c27b0',
      c10: '#03a9f4',
      c11: '#cddc39',
      c12: '#ff5722',
      c13: '#607d8b',
      c14: '#00bcd4',
      c15: '#795548',
      c16: '#e91e63',
      c17: '#66bb6a',
      c18: '#ffa726',
      c19: '#7e57c2',
      c20: '#bdbdbd',
    }),
  }),
});

export default palette;
