/**
 * 插入微联 JavaScriptBridge
 */
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class InsertJavaScriptBridgePlugin {
  apply(compiler) {
    compiler.plugin('compilation', function(compilation) {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'InsertJavaScriptBridgePlugin',
        (data, cb) => {
          const html = data.html;
          const dom = new JSDOM(html);
          const document = dom.window.document;
          const script = document.createElement('script');
          const children = document.head.children;
          const insertDom = [].find.call(children, (item, index) => {
            if(item.tagName === 'SCRIPT') {
              return item;
            }
          });
          script.src = "https://static.360buyimg.com/smart/jdsmart-1.0.3.js";
          document.querySelector("head").insertBefore(script, insertDom);
          data.html = dom.serialize();
          cb();
        },
      );
    });
  }
}

module.exports = InsertJavaScriptBridgePlugin;
