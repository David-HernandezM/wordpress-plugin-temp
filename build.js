const fs = require('fs');
const path = require('path');

const pluginName = 'json-sender-advanced';
const itemsToCopy = [
    'build',
    'index.php',
    'frontend.js',
    'README.md'
];

const distDir = path.join(__dirname, pluginName + '-dist');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName),
                              path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

itemsToCopy.forEach(item => {
    const src = path.join(__dirname, item);
    const dest = path.join(distDir, item);
    copyRecursiveSync(src, dest);
});

console.log("✅ Plugin empaquetado en:", distDir);
