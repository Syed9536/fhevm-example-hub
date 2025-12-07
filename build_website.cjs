const fs = require('fs');
const path = require('path');

// Directories setup
const contractsDir = path.join(__dirname, 'contracts', 'examples');
const docsTemplatesDir = path.join(__dirname, 'docs', 'templates');

// Ensure docs/templates folder exists
if (!fs.existsSync(docsTemplatesDir)) {
    fs.mkdirSync(docsTemplatesDir, { recursive: true });
}

// 1. Generate Individual Pages for each Example
console.log("📝 Generating documentation pages...");
const files = fs.readdirSync(contractsDir);
let links = [];

files.forEach(file => {
    if (file.endsWith('.sol')) {
        const name = file.replace('.sol', '');
        const kebabName = name.toLowerCase().replace(/_/g, '-'); // FHE_Add -> fhe-add
        const contractContent = fs.readFileSync(path.join(contractsDir, file), 'utf8');

        // Create Markdown Content
        const mdContent = `# ${name}

This example demonstrates the **${name}** operation using Zama's FHEVM.

## 📄 Smart Contract Code

\`\`\`solidity
${contractContent}
\`\`\`

## 🚀 How to Run

1. **Compile**
   \`\`\`bash
   npx hardhat compile
   \`\`\`

2. **Test**
   \`\`\`bash
   npx hardhat test
   \`\`\`
`;
        
        // Write .md file
        fs.writeFileSync(path.join(docsTemplatesDir, `${kebabName}.md`), mdContent);
        console.log(`✅ Created page: templates/${kebabName}.md`);
        
        // Store link for index
        links.push({ name: name, link: `/templates/${kebabName}` });
    }
});

// 2. Update examples.md with INTERNAL Links
console.log("🔗 Updating Examples Library index...");
let indexContent = `# 📚 Examples Library

Explore our collection of **15+ FHEVM Examples** hosted directly on this hub.

---

## 🧮 Arithmetic
`;

// Helper to add links
const addLink = (filter, title) => {
    const found = links.filter(l => l.name.includes(filter));
    found.forEach(l => {
        indexContent += `### [${l.name}](${l.link})\n`;
        indexContent += `View the source code and usage guide for ${l.name}.\n\n`;
    });
};

addLink('Add', ''); addLink('Sub', ''); addLink('Mul', ''); addLink('Div', ''); addLink('Rem', '');

indexContent += `## 🧠 Bitwise Logic\n`;
addLink('And', ''); addLink('Or', ''); addLink('Xor', '');

indexContent += `## ⚖️ Comparisons\n`;
addLink('Eq', ''); addLink('Ne', ''); addLink('Gt', ''); addLink('Lt', ''); addLink('Gte', ''); addLink('Lte', '');

indexContent += `## 🎛️ Advanced\n`;
addLink('Mux', '');

fs.writeFileSync(path.join(__dirname, 'docs', 'examples.md'), indexContent);
console.log("🎉 Website updated successfully! Now push to GitHub.");
