import { ReplaceResult } from '../ReplaceTemplates/Base';
export interface BuildTemplateResult {
  status: boolean;
  buildDirAddress: string;
}

abstract class BuildTemplatesBase {
  abstract build(replaceResult: ReplaceResult): BuildTemplateResult;
}
export default BuildTemplatesBase;
