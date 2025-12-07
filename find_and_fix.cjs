const fs = require('fs');
const path = require('path');

function findFile(startPath, filter) {
    if (!fs.existsSync(startPath)) return null;
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            const found = findFile(filename, filter);
            if (found) return found;
        } else if (filename.endsWith(filter)) {
            return filename;
        }
    }
    return null;
}

// 1. Dhoondo ki TFHE.sol kahan hai
console.log("🕵️‍♂️ Hunting for TFHE.sol in node_modules...");
// Hum poore @fhevm folder mein dhoondenge
const searchDir = path.join(__dirname, 'node_modules', '@fhevm');
const foundPath = findFile(searchDir, 'TFHE.sol');

if (!foundPath) {
    console.error("❌ Fatal Error: TFHE.sol file install hi nahi hui hai!");
    console.log("Try running: npm install @fhevm/solidity@latest");
    process.exit(1);
}

// 2. Sahi Import Path banao
// Example foundPath: /Users/.../node_modules/@fhevm/solidity/contracts/TFHE.sol
// Humein chahiye: @fhevm/solidity/contracts/TFHE.sol
const relativePath = foundPath.split('node_modules/')[1];
console.log(`✅ FOUND IT! Correct Import Path: "${relativePath}"`);

// 3. Files Update karo
const examplesDir = path.join(__dirname, 'contracts', 'examples');
if (fs.existsSync(examplesDir)) {
    const files = fs.readdirSync(examplesDir);
    let count = 0;
    
    files.forEach(file => {
        if (file.endsWith('.sol')) {
            const filePath = path.join(examplesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Purana koi bhi import ho, use naye se replace karo
            const regex = /import\s+["'].*TFHE\.sol["'];/g;
            const newImport = `import "${relativePath}";`;
            
            if (regex.test(content)) {
                content = content.replace(regex, newImport);
                fs.writeFileSync(filePath, content);
                count++;
            }
        }
    });
    console.log(`🔥 Fixed ${count} files with the correct path!`);
} else {
    console.log("❌ Examples folder nahi mila.");
}
