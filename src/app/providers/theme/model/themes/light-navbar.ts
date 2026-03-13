
export type NavbarColorName = 'navbar_white' | 'navbar_green' | 'navbar_grey'
export interface ThemeNavbarItem {
  bg: string
  color: string
  // iconColor: string
  contrastText: string
}
export type NavbarTheme = { navbar: ThemeNavbarItem }

export const navbarThemes: Record<NavbarColorName, NavbarTheme> = {
  navbar_white: {
    navbar: {
      bg: '#ffffff',
      color: '#7f7f7f',
      contrastText: '#2e2e2e',
      // iconColor: '#7f7f7f',
    }
  },
  navbar_green: {
    navbar: {
      bg: '#ffffff',
      color: '#7f7f7f',
      contrastText: '#2e2e2e',
      // iconColor: '#7f7f7f',
    }
  },
  navbar_grey: {
    navbar: {
      bg: '#ffffff',
      color: '#7f7f7f',
      contrastText: '#2e2e2e',
      // iconColor: '#7f7f7f',
    }
  },
}
