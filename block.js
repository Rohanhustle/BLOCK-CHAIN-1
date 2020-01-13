const {GENESIS_DATA} =require('./config'); 
const cryptoHash = require('./crypto-hash');

 class Block{
    constructor({timestamp,lastHash,Hash,data}){
        this.timestamp = timestamp;
        this.lastHash=lastHash;
        this.Hash = Hash;
        this.data =data;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({lastBlock , data}){

        const timestamp=Date.now();
        const lastHash = lastBlock.Hash;

        return new this({
            timestamp,
            lastHash,
            data,
            Hash: cryptoHash(timestamp,lastHash,data)
        })
    }
 }



 module.exports = Block;

// const block1 = new Block({
//     timestamp:'01/01/01',
//     lastHash:'foo-lastHash',
//     hash:'foo-hash',
//     data:'foo-data'
// });

