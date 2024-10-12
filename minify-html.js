const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
const chokidar = require('chokidar');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

function minifyHtmlFile(filePath) {
  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const minifiedContent = minify(fileContent, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeComments: true
  });

  const distFilePath = path.join(distDir, fileName);
  fs.writeFileSync(distFilePath, minifiedContent);
}

function minifyHtml() {
  fs.readdirSync(srcDir).forEach(file => {
    const filePath = path.join(srcDir, file);
    if (path.extname(file) === '.html') {
      minifyHtmlFile(filePath);
    }
  });
}

minifyHtml();

chokidar.watch(srcDir, { ignoreInitial: true }).on('all', (event, filePath) => {
  if (path.extname(filePath) === '.html') {
    console.log(`Change detected in ${filePath}. Minifying...`);
    minifyHtmlFile(filePath);
  }
});
