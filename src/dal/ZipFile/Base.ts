import { ReadStream } from 'fs';

abstract class ZipFile {
  /**
   * 压缩文件夹的地址
   * @protected
   * @type {string}
   * @memberof ZipFile
   */
  protected address: string;
  constructor (address: string) {
    this.address = address;
  }
  /**
   * 压缩文件夹
   *
   * @abstract
   * @returns {ReadStream}
   * @memberof ZipFile
   */
  abstract zipDir(): ReadStream;
}
export default ZipFile;
