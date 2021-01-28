const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');   // assume it as constructor function or class
const web3 = new Web3(ganache.provider()) //instance
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
let INITIAL_STRING = 'Hi there!'

beforeEach(async ()=>{
    //get a list of all accounts
    accounts = await web3.eth.getAccounts()
    
    //use one of those accounts to deploy
    //the contract.
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({from: accounts[0], gas:'1000000'})
});

describe('Inbox', () =>{
    it('deploys a contract', () =>{
        assert.ok(inbox.options.address);   //checks deployment works
    });

    it('has a default message', async () =>{
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'Hi there!')
    });

    it('can change the message', async () =>{
        await inbox.methods.setMessage('Bye Hello').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'Bye Hello');

    })
});

// class Car{
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car;
// // runs between it functions.
// beforeEach(() =>{
//      car = new Car();
// });

// describe('Car', () =>{
//     it('can park', () =>{
//         assert.strictEqual(car.park(), 'stopped');
//     });

//     it('can drive', () =>{
//         assert.strictEqual(car.drive(), 'vroom');
//     })


// })