import { ReplaceResult } from '../ReplaceTemplates/Base';
export interface BuildTemplateResult {
  status: boolean;
  buildDirAddress: string;
}

abstract class BuildTemplatesBase {
  protected replaceResult: ReplaceResult;
  constructor(replaceResult: ReplaceResult) {
    this.replaceResult = replaceResult;
  }
  abstract build(): BuildTemplateResult;
}
export default BuildTemplatesBase;
