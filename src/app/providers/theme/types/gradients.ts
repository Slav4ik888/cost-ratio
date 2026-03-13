import { gradients } from '../model/themes/light-gradients';


export type Gradients = typeof gradients;

export interface GradientsItem {
  main  : string
  state : string
}

export type GradientColorName =
  | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark'
  | 'department_7' | 'department_6' | 'department_5' | 'department_4' | 'department_3'
  | 'department_2' | 'department_1';
