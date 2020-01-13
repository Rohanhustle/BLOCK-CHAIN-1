const Block=require('./block');
const {GENESIS_DATA}=require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () =>{
    const timestamp='a-date';
    const lastHash='foo-hash';
    const Hash='bar-hash';
    const data=['blockchain','data'];
    const block=new Block({timestamp,lastHash,Hash,data});
    
    it('has a timestamp,lastHash,hash, and data property',() =>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.Hash).toEqual(Hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()',() =>{
        const genesisBlock = Block.genesis();

        console.log('genesisBlock',genesisBlock);

        it('returns a Block instance',() =>{
            expect(genesisBlock instanceof Block).toBe(true);
         });

         it('returns the genesis data',()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
         });
    });

    describe('mineBlock()',() => {
        const lastBlock=Block.genesis();
        const data ='mined data';
        const minedBLock = Block.mineBlock({lastBlock,data});

        it('returns a Block instance',()=>{
            expect(minedBLock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` to be the `hash` of the lastBlock',() =>{
            expect(minedBLock.lastHash).toEqual(lastBlock.Hash);
        });

        it('sets the `data`',() =>{
            expect(minedBLock.data).toEqual(data);
        });

        it('sets a `timestamp`',() =>{
            expect(minedBLock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on proper inputs',() =>{
            expect(minedBLock.Hash).toEqual(cryptoHash(minedBLock.timestamp,lastBlock.Hash,data));
        });
    });
});