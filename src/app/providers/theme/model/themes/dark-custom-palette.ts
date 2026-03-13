import { brown, orange } from '@mui/material/colors';
import { Color, PaletteMode } from '@mui/material/styles';
import { CustomPalette } from '../../types';


export const customPalette: CustomPalette = {
  mode: 'dark' as PaletteMode,

  background: {
    default       : '#141414',
    card          : '#252525',
    paper         : '#212121',
    paperLight    : '#313131',
    demoPage      : '#212121',
    demoPageHover : '#272727',
  },

  text: {
    lighter: '#3a3a3a',
    light: '#4f4f4f',
    main: '#a2a2a2',
    dark: '#bcbcbc',
    focus: '#a0a0a0',
    primary: '#e1e1e1',
    secondary: '#000000',
    disabled: '#000000',
    contrastText: '#fff',
  },

  inherit: {
    main: '#000000',
    focus: '#000000',
  },

  transparent: {
    main: '#ffffff00',
    focus: '#ffffff00',
  },

  white: {
    main: '#e2e2e2',
    focus: '#ffffff',
  },

  black: {
    light: '#0e0e0e',
    main: '#000000',
    focus: '#000000',
  },

  primary: {
    light: '#000000',
    main: '#7F84FF',
    dark: '#000000',
    focus: '#7F84FF',
    contrastText: '#000000',
  },

  secondary: {
    light: '#767676',
    main: '#7b809a',
    dark: '#000000',
    focus: '#8f93a9',
    contrastText: '#000000',
  },

  info: {
    light: '#000000',
    main: '#1A73E8',
    dark: '#000000',
    focus: '#1662C4',
    contrastText: '#000000',
  },

  success: {
    light: '#000000',
    main: '#4CAF50',
    dark: '#000000',
    focus: '#67bb6a',
    contrastText: '#000000',
  },

  warning: {
    light: '#000000',
    main: '#fb8c00',
    dark: '#000000',
    focus: '#fc9d26',
    contrastText: '#000000',
  },

  error: {
    light: '#000000',
    main: '#bc4036',
    dark: '#000000',
    focus: '#f65f53',
    contrastText: '#000000',
  },

  light: {
    light: '#000000',
    main: '#7f7f7f',
    dark: '#2f2f2f',
    focus: '#f0f2f5',
    contrastText: '#000000',
  },

  dark: {
    light: '#313131',
    main: '#7f7f7f',
    dark: '#505050',
    focus: '#a2a2a2',
    contrastText: '#ffffff',
  },

  orange: {
    light: orange[200],
    main: orange[500],
    dark: orange[800],
    focus: orange[800],
    contrastText: '#000000',
  },

  grey: {
    100: '#f8f9fa',
    200: '#f0f2f5',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  } as Color,

  editTopPanel: {
    background: '#252525'
  },

  // Configurator
  configurator: {
    main: 'rgba(53, 53, 53, 1)',
    color: '#e2e2e2',
    gradients: {
      main  : 'rgba(53, 53, 53, 1)',
      state : 'rgba(27, 27, 27, 1)',
    },
    title: {
      headerColor: '#e2e2e2',
      headerSubtitle: '#7b7b7b',
      headerIcon: '#737373',
      itemColor: '#bebebe',
      // ViewItemConfigurator
      title1: '#a1a1a1', // title1
      title2: '#54707d', // title2
      subtitle1: '#475b6f', // subtitle1
      subtitle2: '#7a7a7a', // subtitle2
      subtitle3: '#7a7a7a', // subtitle3
      textTitle: '#b3b3b3'
    },
    tabs: {
      notSelected: '#7f7f7f'
    },
    icon: {
      default : '#7b7b7b',
      hover   : '#7b7b7b',
      empty   : '#4f4f4f',
    }
  },

  template: {
    color: brown[600],
  },

  // Заголовок в ReportsLineChart
  reportsChartTitle: {
    main: '#7a7a7a',
    focus: '#7a7a7a',
  },

  // Цифры сравнения - последнее значение
  comparisonIndicators_1: {
    main: '#3a3a3a',
    focus: '#3a3a3a',
  },

  comparisonIndicators_2: {
    main: '#8a8a8a',
    focus: '#8a8a8a',
  },

  // Цвета с фоном для: Рост | Падение | Без изменений - результатов
  increasedBG: {
    growth: {
      color      : '#274e13',
      background : '#02bf02',
    },
    fall: {
      color      : '#660000',
      background : '#cc0000',
    },
    unchanged: {
      color      : '#b7b7b7',
      background : '#434343',
    },
  },

  // Цвета с фоном для прогресса: Красный | Жёлтый | Зелёный
  progressBG: {
    danger: {
      color      : '#660000',
      background : '#cc0000',
    },
    average: {
      color      : '#783f04',
      background : '#ffd966',
    },
    exellent: {
      color      : '#274e13',
      background : '#02bf02',
    },
  },


  // My colors for departments
  department_7_title: {
    main: 'rgb(80 141 222 / 80%)', // Заголовок первого главного блока отделения
    focus: 'rgb(80 141 222 / 80%)',
  },
  department_1_title: {
    main: 'rgb(209 148 58 / 80%)',
    focus: 'rgb(209 148 58 / 80%)',
  },
  department_2_title: {
    main: 'rgb(141 97 183 / 80%)',
    focus: 'rgb(141 97 183 / 80%)',
  },
  department_3_title: {
    main: 'rgb(235 129 129 / 80%)',
    focus: 'rgb(235 129 129 / 80%)',
  },
  department_4_title: {
    main: 'rgb(63 122 53 / 80%)',
    focus: 'rgb(63 122 53 / 80%)',
  },
  department_5_title: {
    main: 'rgb(132 132 132 / 80%)',
    focus: 'rgb(132 132 132 / 80%)',
  },
  department_6_title: {
    main: 'rgb(194 201 35 / 80%)',
    focus: 'rgb(194 201 35 / 80%)',
  },

  socialMediaColors: {
    facebook: {
      main: '#3b5998',
      dark: '#344e86',
    },

    twitter: {
      main: '#55acee',
      dark: '#3ea1ec',
    },

    instagram: {
      main: '#125688',
      dark: '#0e456d',
    },

    linkedin: {
      main: '#0077b5',
      dark: '#00669c',
    },

    pinterest: {
      main: '#cc2127',
      dark: '#b21d22',
    },

    youtube: {
      main: '#e52d27',
      dark: '#d41f1a',
    },

    vimeo: {
      main: '#1ab7ea',
      dark: '#13a3d2',
    },

    slack: {
      main: '#3aaf85',
      dark: '#329874',
    },

    dribbble: {
      main: '#ea4c89',
      dark: '#e73177',
    },

    github: {
      main: '#24292e',
      dark: '#171a1d',
    },

    reddit: {
      main: '#ff4500',
      dark: '#e03d00',
    },

    tumblr: {
      main: '#35465c',
      dark: '#2a3749',
    },
  },

  // StatisticPeriodType
  statisticPeriodTypeChip: {
    day: {
      color      : '#dadada',
      background : 'braun',
    },
    week: {
      color      : '#263426',
      background : '#afc8af',
    },
    month: {
      color      : '#afc8af',
      background : '#33635e',
    },
    month_cal: {
      color      : '#dadada',
      background : 'blue',
    },
  },

  // DashboardConditionType
  conditionTypeChip: {
    power: {
      color      : '#d4edbb',
      background : '#1B5E20',
    },
    abundance: {
      color      : '#b8dcf5',
      background : '#0a53a8',
    },
    normal: {
      color      : '#1159ab',
      background : '#bfe1f6',
    },
    emergency: {
      color      : '#b00302',
      background : '#fecfc8',
    },
    danger: {
      color      : '#fecfc8',
      background : '#b00302',
    },
    non_existence: {
      color      : '#3d3d3d',
      background : '#e6e6e6',
    },
    null: {
      color      : '#3d3d3d',
      background : '#e6e6e6',
    },
    any: {
      color      : '#fff',
      background : '#000',
    },
  },

  badgeColors: {
    primary: {
      background: '#f8b3ca',
      text: '#cc084b',
    },

    secondary: {
      background: '#d7d9e1',
      text: '#6c757d',
    },

    info: {
      background: '#aecef7',
      text: '#095bc6',
    },

    success: {
      background: '#bce2be',
      text: '#339537',
    },

    warning: {
      background: '#ffd59f',
      text: '#c87000',
    },

    error: {
      background: '#fcd3d0',
      text: '#f61200',
    },

    light: {
      background: '#ffffff',
      text: '#c7d3de',
    },

    dark: {
      background: '#8097bf',
      text: '#1e2e4a',
    },
  },

  coloredShadows: {
    primary: '#e91e62',
    secondary: '#110e0e',
    info: '#00bbd4',
    success: '#4caf4f',
    warning: '#ff9900',
    error: '#f44336',
    light: '#adb5bd',
    dark: '#404040',
  },

  dialog: {
    title: {
      background: '#1a1a1a',
    },
    content: {
      background: '#212121',
    },
  },

  // Material Kit 2 React Base Styles
  tabs: {
    indicator: {
      boxShadow: '#ddd'
    },
  },
};
