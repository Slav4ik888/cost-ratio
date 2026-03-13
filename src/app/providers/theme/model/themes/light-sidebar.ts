import { GradientsItem } from '../../types';


export type SidebarColorName = 'sidebar_black' | 'sidebar_blue' | 'sidebar_grey'

export type SidebarTheme = {
  sidebar: {
    main         : string
    focus        : string
    contrastText : string
    logo         : string
  } & {
    gradients: GradientsItem
  } & {
    gradientsActiveBtn: GradientsItem
  }
}


export const sidebarThemes: Record<SidebarColorName, SidebarTheme> = {
  sidebar_black: {
    sidebar: {
      main         : 'rgba(66, 66, 74, 1)',
      focus        : 'rgba(66, 66, 74, 1)',
      contrastText : '#ffffff',
      logo         : '#ffffff',

      gradients: {
        main  : 'rgba(34, 34, 34, 1)',
        state : 'rgba(25, 25, 25, 1)',
      },
      gradientsActiveBtn: {
        main  : 'rgba(76, 76, 76, 1)',
        state : 'rgba(44, 44, 44, 1)',
      },
    }
  },
  sidebar_blue: {
    sidebar: {
      main         : 'rgba(31, 63, 94, 1)',
      focus        : 'rgba(31, 63, 94, 1)',
      contrastText : '#ffffff',
      logo         : '#ffffff',
      gradients: {
        main  : 'rgba(31, 63, 94, 1)',
        state : 'rgba(4, 20, 34, 1)',
      },
      gradientsActiveBtn: {
        main  : 'rgba(24, 50, 77, 1)',
        state : 'rgba(13, 13, 52, 1)',
      },
    }
  },
  sidebar_grey: {
    sidebar: {
      main         : 'rgb(72 72 72)',
      focus        : 'rgb(72 72 72)',
      contrastText : '#ffffff',
      logo         : '#ffffff',

      gradients: {
        main  : 'rgb(72 72 72)',
        state : 'rgb(41 41 41)',
      },
      gradientsActiveBtn: {
        main  : 'rgba(76, 76, 76, 1)',
        state : 'rgba(44, 44, 44, 1)',
      },
    }
  },
}
