import { ReadStream } from 'fs';

abstract class UploadZipFileBase {
  /**
   * 要上传的数据流
   * @protected
   * @type {ReadStream}
   * @memberof UploadZipFileBase
   */
  protected readStream: ReadStream;
  constructor(readStream: ReadStream) {
    this.readStream = readStream;
  }
  /**
   * 上传文件
   */
  abstract upload(): boolean;
}
export default UploadZipFileBase;
