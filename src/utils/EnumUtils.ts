export class EnumUtils {
  public static getEnumKey<T>(tEnum: T, enumValue: string) {
    const entry = Object.entries(tEnum).find(([_key, value]) => value === enumValue);
    if (entry) {
      return entry[1];
    }
    return undefined;
  }
}
