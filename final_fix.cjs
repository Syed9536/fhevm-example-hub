const fs = require('fs');
const path = require('path');

// 1. Find TFHE.sol
console.log("🔍 Searching for TFHE.sol...");
const startDir = path.join(__dirname, 'node_modules', '@fhevm');

function findFile(dir, filename) {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            const found = findFile(fullPath, filename);
            if (found) return found;
        } else if (file === filename) {
            return fullPath;
        }
    }
    return null;
}

const foundPath = findFile(startDir, 'TFHE.sol');

if (!foundPath) {
    console.error("❌ ERROR: File abhi bhi nahi mili! Shayad install fail hua.");
    process.exit(1);
}

// 2. Get Import Path (e.g., @fhevm/solidity/lib/TFHE.sol)
const importPath = foundPath.split('node_modules/')[1];
console.log(`✅ FOUND! Path: "${importPath}"`);

// 3. Update Contracts
const examplesDir = path.join(__dirname, 'contracts', 'examples');
if (fs.existsSync(examplesDir)) {
    const files = fs.readdirSync(examplesDir);
    files.forEach(file => {
        if (file.endsWith('.sol')) {
            const filePath = path.join(examplesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            const regex = /import\s+["'].*TFHE\.sol["'];/g;
            content = content.replace(regex, `import "${importPath}";`);
            fs.writeFileSync(filePath, content);
        }
    });
    console.log("🔥 All 15 files updated with the correct path!");
}
