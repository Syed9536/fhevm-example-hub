const fs = require('fs');
const path = require('path');

// Hunt for TFHE.sol
const searchDir = path.join(__dirname, 'node_modules');
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

console.log("🕵️‍♂️ Hunting for TFHE.sol...");
const found = findFile(searchDir, 'TFHE.sol');

if (found) {
    // Determine path relative to node_modules for import
    // Example: @fhevm/solidity/lib/TFHE.sol
    const parts = found.split('node_modules/');
    const importPath = parts[parts.length - 1]; 
    console.log(`✅ TFHE.sol found at: ${importPath}`);
    
    const exDir = path.join(__dirname, 'contracts', 'examples');
    if (fs.existsSync(exDir)) {
        fs.readdirSync(exDir).forEach(f => {
            if (f.endsWith('.sol')) {
                const p = path.join(exDir, f);
                let c = fs.readFileSync(p, 'utf8');
                // Replace any TFHE import
                c = c.replace(/import\s+["'].*TFHE\.sol["'];/g, `import "${importPath}";`);
                fs.writeFileSync(p, c);
            }
        });
        console.log("🔥 Contracts updated!");
    }
} else {
    console.log("⚠️ TFHE.sol not found. Compilation might fail.");
}
