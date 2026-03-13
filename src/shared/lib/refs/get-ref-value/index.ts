import { MutableRefObject } from 'react';

interface Value {
  value: string
}

export function getRefValue(ref: MutableRefObject<null>): string {
  if (! ref || ! ref.current) return ''

  return (ref.current as unknown as Value).value || ''
}
