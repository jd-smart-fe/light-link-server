export interface ReplaceResult {
  status: boolean; // 是否成功 true 成功，false 失败。
  fileAddress: string; // 替换模板后文件的地址。
}

abstract class ReplaceTemplatesBase {
  /**
   * 前后端定义的 JSON 协议
   * 根据 config 生成对应的模板
   * @param config any
   */
  abstract replaceTemplates(config: any): ReplaceResult;
}
export default ReplaceTemplatesBase;
