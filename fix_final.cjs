const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'contracts', 'examples');

if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    let count = 0;
    
    files.forEach(file => {
        if (file.endsWith('.sol')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Regex to match ANY TFHE import (lib, contracts, utils, etc.)
            const regex = /import\s+["'].*TFHE\.sol["'];/g;
            
            // The Correct Standard Path for v0.9+
            const correctImport = 'import "@fhevm/solidity/contracts/utils/TFHE.sol";';
            
            if (regex.test(content)) {
                content = content.replace(regex, correctImport);
                fs.writeFileSync(filePath, content);
                count++;
            }
        }
    });
    console.log(`✅ Fixed imports in ${count} files to use 'contracts/utils/TFHE.sol'`);
} else {
    console.log("❌ Examples folder not found");
}
