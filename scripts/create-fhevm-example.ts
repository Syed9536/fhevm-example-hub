import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { generateReadme } from './generate-docs';

const program = new Command();

program
  .name('create-fhevm-example')
  .description('CLI to generate FHEVM example repositories')
  .argument('<project-name>', 'Name of the directory to create')
  .option('-t, --template <template>', 'Template name') // Removed default
  .action(async (projectName, options) => {
    try {
      const currentDir = process.cwd();
      const templatesDir = path.join(currentDir, 'templates', 'contracts');
      
      // 1. Get List of Available Templates
      const files = fs.readdirSync(templatesDir);
      const availableTemplates = files
        .filter(file => file.endsWith('.sol'))
        .map(file => file.replace('.sol', ''));

      // 2. Validate or Ask for Template
      let selectedTemplate = options.template;

      if (!selectedTemplate) {
        console.log(`\n⚠️  No template specified.`);
        console.log(`Available Templates:`);
        availableTemplates.forEach(t => console.log(`  - ${t}`));
        console.log(`\nUsage: npx ts-node scripts/create-fhevm-example.ts ${projectName} --template <name>`);
        console.log(`Example: npx ts-node scripts/create-fhevm-example.ts ${projectName} --template ${availableTemplates[0]}`);
        process.exit(1);
      }

      if (!availableTemplates.includes(selectedTemplate)) {
        console.error(`❌ Error: Template '${selectedTemplate}' not found.`);
        console.log(`Available: ${availableTemplates.join(', ')}`);
        process.exit(1);
      }

      // 3. Execution Logic
      const baseTemplatePath = path.join(currentDir, 'base-template');
      const outputDir = path.join(currentDir, projectName);
      const contractSource = path.join(currentDir, 'templates', 'contracts', selectedTemplate + '.sol');
      const testSource = path.join(currentDir, 'templates', 'tests', selectedTemplate + '.ts');

      console.log(`\n🚀 Initializing: ${projectName}`);
      console.log(`📋 Template: ${selectedTemplate}`);

      if (!fs.existsSync(baseTemplatePath)) throw new Error('Base template not found!');
      if (fs.existsSync(outputDir)) throw new Error(`Directory ${projectName} already exists.`);

      console.log('📦 Cloning base template...');
      await fs.copy(baseTemplatePath, outputDir);

      console.log('🧹 Cleaning default files...');
      await fs.remove(path.join(outputDir, 'contracts', 'Greeter.sol'));
      await fs.remove(path.join(outputDir, 'contracts', 'Lock.sol'));
      const testDir = path.join(outputDir, 'test');
      if (fs.existsSync(testDir)) fs.emptyDirSync(testDir);
      else fs.mkdirSync(testDir);

      console.log('💉 Injecting smart contracts and tests...');
      await fs.copy(contractSource, path.join(outputDir, 'contracts', selectedTemplate + '.sol'));
      if (fs.existsSync(testSource)) {
          await fs.copy(testSource, path.join(outputDir, 'test', selectedTemplate + '.ts'));
      } else {
          console.warn('⚠️ Warning: No matching test file found, skipping test injection.');
      }

      console.log('📖 Generating documentation...');
      await generateReadme(outputDir, selectedTemplate);

      // Update package.json
      const packageJsonPath = path.join(outputDir, 'package.json');
      const pkg = await fs.readJson(packageJsonPath);
      pkg.name = projectName;
      pkg.description = `Zama FHEVM Example: ${selectedTemplate}`;
      await fs.writeJson(packageJsonPath, pkg, { spaces: 2 });

      console.log('✅ Success! Your FHEVM project is ready.');
      console.log(`\nRun: cd ${projectName} && npm install && npx hardhat test`);

    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);