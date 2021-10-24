export class NumberUtils {
  public static roundTo2dp(val: number) {
    return Math.round(val * 100) / 100;
  }

  public static roundTo3dp(val: number) {
    return Math.round(val * 1000) / 1000;
  }
}
