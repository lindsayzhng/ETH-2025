
const solc = require('solc');
const fs = require('fs');

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

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  if (output.errors) {
    console.error('Compilation errors:');
    output.errors.forEach(err => console.error(err.formattedMessage));
    return;
  }

  const contract = output.contracts[contractFileName]['MyNFT'];
  const bytecode = '0x' + contract.evm.bytecode.object;

  console.log(bytecode);
}

compile();
