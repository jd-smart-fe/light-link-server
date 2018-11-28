import { ReplaceResult } from '../ReplaceTemplates/Base';

export interface BuildTemplateResult {
  status: boolean;
  buildDirAddress?: string;
}

abstract class BuildTemplatesBase {
  protected replaceResult: ReplaceResult;
  constructor(replaceResult: ReplaceResult) {
    this.replaceResult = replaceResult;
  }
  async abstract build(): Promise<BuildTemplateResult>;
}
export default BuildTemplatesBase;
