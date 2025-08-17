
const solc = require('solc');
const fs = require('fs');
const path = require('path');

function findImports(importPath) {
  const nodeModulesPath = path.resolve(__dirname, 'node_modules', importPath);
  if (fs.existsSync(nodeModulesPath)) {
    return { contents: fs.readFileSync(nodeModulesPath, 'utf8') };
  }
  
  const localPath = path.resolve(__dirname, importPath);
  if (fs.existsSync(localPath)) {
      return { contents: fs.readFileSync(localPath, 'utf8') };
  }

  return { error: 'File not found' };
}

async function compile() {
  const contractSource = fs.readFileSync('MyNFT.sol', 'utf8');
  const contractFileName = 'MyNFT.sol';

  const input = {
    language: 'Solidity',
    sources: {
      [contractFileName]: {
        content: contractSource,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

  if (output.errors) {
    let hasErrors = false;
    output.errors.forEach(err => {
      if (err.severity === 'error') {
        console.error(err.formattedMessage);
        hasErrors = true;
      }
    });
    if (hasErrors) return;
  }

  const contract = output.contracts[contractFileName]['MyNFT'];
  const bytecode = '0x' + contract.evm.bytecode.object;

  console.log(bytecode);
}

compile();
