import { ReadStream } from 'fs';

abstract class UploadZipFileBase {
  /**
   * 上传文件
   * @param data 要上传的文件流
   */
  abstract upload(data: ReadStream): boolean;
}
export default UploadZipFileBase;
