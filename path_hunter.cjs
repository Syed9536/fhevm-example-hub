const fs = require('fs');
const path = require('path');

function findFile(dir, filename) {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            const found = findFile(fullPath, filename);
            if (found) return found;
        } else if (file === filename) return fullPath;
    }
    return null;
}

console.log("🕵️‍♂️ Hunting for TFHE.sol...");
const searchDir = path.join(__dirname, 'node_modules');
const foundPath = findFile(searchDir, 'TFHE.sol');

if (!foundPath) {
    console.error("❌ ERROR: TFHE.sol abhi bhi nahi mili! Install check karo.");
    process.exit(1);
}

// Windows/Mac path fix
const relativePath = foundPath.split('node_modules/')[1].replace(/\\/g, '/');
console.log(`✅ FOUND IT! Path: "${relativePath}"`);

const examplesDir = path.join(__dirname, 'contracts', 'examples');
if (fs.existsSync(examplesDir)) {
    const files = fs.readdirSync(examplesDir);
    files.forEach(file => {
        if (file.endsWith('.sol')) {
            const filePath = path.join(examplesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            const regex = /import\s+["'].*TFHE\.sol["'];/g;
            content = content.replace(regex, `import "${relativePath}";`);
            fs.writeFileSync(filePath, content);
        }
    });
    console.log("🔥 All files updated with correct path!");
}
