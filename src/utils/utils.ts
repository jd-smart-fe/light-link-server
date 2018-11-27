import * as uuid from 'uuid';
class Utils {
  public static uuid(): string {
    return uuid.v1();
  }
}

export default Utils;