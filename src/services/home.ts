import Replace from '../dal/ReplaceTemplates/Replace';
import ReplaceTemplatesBase from '../dal/ReplaceTemplates/Base';
import BuildTemplatesBase from '../dal/BulidTemplates/Base';
import Bulid from '../dal/BulidTemplates/Bulid';
class HomeSevice {
  async publish (data) {
    const replace: ReplaceTemplatesBase = new Replace(data);
    const replaceReslut = await replace.replaceTemplates();
    const build: BuildTemplatesBase = new Bulid(replaceReslut);
    const buildReslut = await build.build();
    return buildReslut;
  }
}
export default HomeSevice;
