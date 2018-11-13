export interface ReplaceResult {
  status: boolean; // 是否成功 true 成功，false 失败。
  fileAddress: string; // 替换模板后文件的地址。
}

abstract class ReplaceTemplatesBase {
  /**
   * 前后端定义的 JSON 协议
   * 根据 config 生成对应的模板
   * @protected
   * @type {*}
   * @memberof ReplaceTemplatesBase
   */
  protected config: any;
  constructor(config) {
    this.config = config;
  }

  abstract replaceTemplates(): ReplaceResult;
}
export default ReplaceTemplatesBase;
