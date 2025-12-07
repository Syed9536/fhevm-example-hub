const fs = require('fs');
const path = require('path');

// 1. Find where TFHE.sol is actually hiding
function findFile(startPath, filter) {
    if (!fs.existsSync(startPath)) {
        console.log("❌ Node modules folder not found. Run 'npm install' first.");
        return null;
    }

    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            const found = findFile(filename, filter);
            if (found) return found;
        } else if (filename.indexOf(filter) >= 0) {
            return filename;
        }
    }
    return null;
}

const packagePath = path.join(__dirname, 'node_modules', '@fhevm', 'solidity');
console.log("🔍 Searching for TFHE.sol in @fhevm/solidity...");

const fullPath = findFile(packagePath, 'TFHE.sol');

if (!fullPath) {
    console.error("❌ ERROR: TFHE.sol file kahin nahi mili! '@fhevm/solidity' shayad theek se install nahi hua.");
    process.exit(1);
}

// 2. Calculate the correct import path
// We need the part after "node_modules/"
const relativePath = fullPath.split('node_modules/')[1]; 
console.log(`✅ FOUND IT! Correct Path: ${relativePath}`);

// 3. Update all contract files
const examplesDir = path.join(__dirname, 'contracts', 'examples');
if (fs.existsSync(examplesDir)) {
    const files = fs.readdirSync(examplesDir);
    let count = 0;
    
    files.forEach(file => {
        if (file.endsWith('.sol')) {
            const filePath = path.join(examplesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Regex to replace ANY import of TFHE.sol
            const regex = /import\s+["'].*TFHE\.sol["'];/g;
            const newImport = `import "${relativePath}";`;
            
            if (regex.test(content)) {
                content = content.replace(regex, newImport);
                fs.writeFileSync(filePath, content);
                count++;
            }
        }
    });
    console.log(`🔥 Updated ${count} files with the correct path!`);
} else {
    console.log("⚠️ Examples folder nahi mila.");
}
