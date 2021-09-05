declare module 'telnyx' {
  export function Telnyx(apiKey: string);

  export const Telnyx;
}

type DeepPartial<T> = {
  [propertyKey in keyof T]?: DeepPartial<T[propertyKey]>;
};
