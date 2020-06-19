const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');

const getContent = (matched, reg, resourcePath) => {
  const result = matched.match(reg);
  const relativePath = result && result[1];
  const absolutePath = path.join(path.dirname(resourcePath), relativePath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

module.exports = function(content) {
  const htmlReg = /<link.*?href=".*?\__inline">/gmi;
  const jsReg = /<script.*?src=".*?\?__inline".*?>.*?<\/script>/gmi;
  
  content = content.replace(jsReg, (matched) => {
    const jsContent = getContent(matched, /src="(.*)\?__inline/, this.resourcePath);
    return `<script type="text/javascript">${jsContent}</script>`;
  }).replace(htmlReg, (matched) => {
    const htmlContent = getContent(matched, /href="(.*)\?__inline/, this.resourcePath);
    return htmlContent;
  });
  
  const options = loaderUtils.getOptions(this);
  const keyReg = /@\{(\w+)\}@/g;
  content = content.replace(keyReg, (matched) => {
    const key = matched.slice(2, -2);
    if (options[key] || options[key] === 0) {
      return options[key];
    }
    return matched;
  });
  
  return `module.exports = ${JSON.stringify(content)}`;
}
