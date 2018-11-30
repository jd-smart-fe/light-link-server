import ZipFileBase from './Base';

class ZipFile extends ZipFileBase {
  constructor(address: string) {
    super(address);
  }
  zipDir() {
    return null;
  }
}
export default ZipFile;
