import {
  amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey,
  indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow,
} from '@mui/material/colors';


export const gradients = {
  primary: {
    main: '#67b244',
    state: '#3fa111',
  },

  secondary: {
    main: '#747b8a',
    state: '#495361',
  },

  info: {
    main: '#49a3f1',
    state: '#1A73E8',
  },

  success: {
    main: '#66BB6A',
    state: '#43A047',
  },

  warning: {
    main: '#FFA726',
    state: '#FB8C00',
  },

  error: {
    main: '#EF5350',
    state: '#E53935',
  },

  light: {
    main: '#EBEFF4',
    state: '#CED4DA',
  },

  dark: {
    main: '#42424a',
    state: '#191919',
  },

  // Navbar gradients
  navbar: {
    main: 'rgba(255, 255, 255, 0.8)',
    state: 'rgba(255, 255, 255, 1)',
  },

  // My gradient for departments
  department_7: {
    main: blue[100] as string, // "rgb(165 210 248)",
    state: blue[300] as string, // "rgb(80 141 222)",
  },
  department_1: {
    main: orange[100] as string, // "rgb(249 214 176)",
    state: orange[300] as string, // "rgb(209 148 58)",
  },
  department_2: {
    main: deepPurple[100] as string, // "rgb(210 186 233)",
    state: deepPurple[300] as string, // "rgb(141 97 183)",
  },
  department_3: {
    main: pink[50] as string, // "rgb(242 188 188)",
    state: pink[300] as string, // "rgb(235 129 129)",
  },
  department_4: {
    main: green[100] as string, // "rgb(161 209 153)",
    state: green[300] as string, // "rgb(63 122 53)",
  },
  department_5: {
    main: grey[300] as string, // "rgb(213 211 211)",
    state: grey[500] as string, // "rgb(132 132 132)",
  },
  department_6: {
    main: amber[100] as string, // "rgb(239 236 129)",
    state: amber[300] as string, // "rgb(194 201 35)",
  },
}
