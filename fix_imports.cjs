const fs = require('fs');
const path = require('path');

// Target directory
const dir = path.join(__dirname, 'contracts', 'examples');

// Read all files
fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Directory nahi mila:", err);
        return;
    }

    files.forEach(file => {
        if (file.endsWith('.sol')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // 🔴 OLD WRONG IMPORT
            const oldImport = '@fhevm/solidity/contracts/utils/TFHE.sol';
            
            // 🟢 NEW CORRECT IMPORT
            const newImport = '@fhevm/solidity/lib/TFHE.sol';

            if (content.includes(oldImport)) {
                content = content.replace(oldImport, newImport);
                fs.writeFileSync(filePath, content);
                console.log(`✅ Fixed import in: ${file}`);
            }
        }
    });
    console.log("\nAll files updated! Now run 'npx hardhat compile'");
});
