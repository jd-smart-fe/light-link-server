import { ReadStream } from 'fs';

abstract class ZipFile {
  /**
   * 压缩文件夹
   * @param address 压缩文件夹的地址
   */
  abstract zipDir(address: string): ReadStream;
}
export default ZipFile;
