const HDWalleetProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

// manually set up the provider
const provider = new HDWalleetProvider(
    'olive double quality pluck echo hammer sail tower pioneer echo summer daughter',
    'https://rinkeby.infura.io/v3/39e65931cfc2470c92122f21605a6b27'    //url where we want to to 
)

const web3 = new Web3(provider);


// we only create this function to use async
const deploy = async () =>{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deply from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({data: bytecode, arguments:['Gu there!']})
                    .send({gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
}
deploy();