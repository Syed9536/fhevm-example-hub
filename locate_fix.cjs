const fs = require('fs');
const path = require('path');

// Recursive function to find a file
function findFile(dir, filename) {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            const result = findFile(fullPath, filename);
            if (result) return result;
        } else if (file === filename) {
            return fullPath;
        }
    }
    return null;
}

console.log("🔍 Searching for TFHE.sol in node_modules...");
const startDir = path.join(__dirname, 'node_modules', '@fhevm');

const foundPath = findFile(startDir, 'TFHE.sol');

if (!foundPath) {
    console.error("❌ ERROR: TFHE.sol abhi bhi missing hai! Installation fail hui hai.");
    process.exit(1);
}

// Extract correct import path (e.g., @fhevm/solidity/lib/TFHE.sol)
const importPath = foundPath.split('node_modules/')[1];
console.log(`✅ FILE FOUND! Correct Path: "${importPath}"`);

// Update all 15 contracts
const examplesDir = path.join(__dirname, 'contracts', 'examples');
if (fs.existsSync(examplesDir)) {
    const files = fs.readdirSync(examplesDir);
    let count = 0;
    
    files.forEach(file => {
        if (file.endsWith('.sol')) {
            const filePath = path.join(examplesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replace old import with the REAL found path
            const regex = /import\s+["'].*TFHE\.sol["'];/g;
            content = content.replace(regex, `import "${importPath}";`);
            
            fs.writeFileSync(filePath, content);
            count++;
        }
    });
    console.log(`🔥 Automatically fixed imports in ${count} files!`);
}
