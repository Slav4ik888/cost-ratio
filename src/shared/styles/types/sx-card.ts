
interface objStr {
  [k: string]: string | number | objStr
}

/**
 * v.2025-07-02
 */
export interface SxCard {
  root?        : objStr
  title?       : objStr // For Title
  label?       : objStr // For Label
  children?    : objStr
  content?     : objStr
  input?       : objStr // For input
  bg?          : objStr // For around input field
  field?       : objStr // For input field
  column?      : objStr
  row?         : objStr
  hiddenLabel? : objStr // For hiddenLabel
  popover?     : objStr // For ColorPicker
  icon?        : objStr // For Icon
}
