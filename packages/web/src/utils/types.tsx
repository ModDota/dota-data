export const isNotNil = <T extends any>(value: T): value is NonNullable<T> => value != null;
