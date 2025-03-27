import cluster from 'node:cluster';

export const isMainCluster =
  process.env.NODE_APP_INSTANCE &&
  Number.parseInt(process.env.NODE_APP_INSTANCE) === 0;
export const isMainProcess = cluster.isPrimary || isMainCluster;
export const isPrimaryProcess = cluster.isPrimary;

export const isDev = process.env.NODE_ENV === 'development';

export const isTest = !!process.env.TEST;
export const cwd = process.cwd();

export type BaseType = boolean | number | string | undefined | null;
export type ArrayType = number[];

export type formatEnvType = BaseType | ArrayType;

function formatValue<T extends formatEnvType = string>(
  key: string,
  defaultValue: T,
  callback?: (value: string) => T,
): T {
  const value: string | undefined = process.env[key];

  if (typeof value === 'undefined') {
    return defaultValue;
  }

  if (!callback) {
    return value as unknown as T;
  }

  return callback(value);
}

export function env(key: string, defaultValue: string = ''): string {
  return formatValue(key, defaultValue);
}

export function envString(key: string, defaultValue: string = ''): string {
  return formatValue(key, defaultValue);
}

export function envNumber(key: string, defaultValue: number = 0): number {
  return formatValue(key, defaultValue, (value: string) => {
    try {
      return Number(value);
    } catch {
      throw new Error(`${key} environment variable is not a number`);
    }
  });
}

export function envBoolean(
  key: string,
  defaultValue: boolean = false,
): boolean {
  return formatValue(key, defaultValue, (value: string) => {
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key} environment variable is not a boolean`);
    }
  });
}

export function envArrayNumber(
  key: string,
  defaultValue: string = '',
): string | number[] | null {
  return formatValue(
    key,
    defaultValue,
    (value: string): number[] | string | null => {
      try {
        const strArray: unknown = JSON.parse(value);

        if (strArray && Array.isArray(strArray)) {
          return strArray.map((item: string) => Number(item));
        } else {
          throw new Error(`${key} environment variable is not a number`);
        }
      } catch {
        throw new Error(`${key} environment variable is not a number array`);
      }
    },
  );
}
