const fs = require('fs');
const path = require('path');
const searchDir = path.join(__dirname, 'node_modules', '@fhevm', 'solidity');

function findFile(dir, name) {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            const res = findFile(fullPath, name);
            if (res) return res;
        } else if (file === name) return fullPath;
    }
    return null;
}

const found = findFile(searchDir, 'TFHE.sol');
if (found) {
    // Extract part after node_modules/
    const importPath = found.split('node_modules/')[1];
    console.log(`✅ TFHE.sol found at: ${importPath}`);
    
    // Update contracts
    const exDir = path.join(__dirname, 'contracts', 'examples');
    if (fs.existsSync(exDir)) {
        fs.readdirSync(exDir).forEach(f => {
            if (f.endsWith('.sol')) {
                const p = path.join(exDir, f);
                let c = fs.readFileSync(p, 'utf8');
                c = c.replace(/import\s+["'].*TFHE\.sol["'];/g, `import "${importPath}";`);
                fs.writeFileSync(p, c);
            }
        });
        console.log("🔥 Contracts updated!");
    }
} else {
    console.log("⚠️ TFHE.sol not found automatically. Compilation might fail.");
}
