const PubNub=require('pubnub')

const credentials = {
    publishKey:'pub-c-bd88c41f-768c-4be4-8975-876b3c3c7734',
    subscribeKey:'sub-c-858fc4ca-35f8-11ea-bbf4-c6d8f98a95a1',
    secretkey:'sec-c-ZGExOTc5MzItMWQ2ZC00OGJkLWFiMTItZDhmYTFlMWFmZDYy'
};

const CHANNELS={
    TEST:'TEST'
};

class PubSub {
    constructor(){
        this.pubnub=new PubNub(credentials);

        this.pubnub.subscribe({channels:[Object.values(CHANNELS) ] });

        this.pubnub.addListener(this.listener());
    }

    listener(){
        return {
            message: messageObject=>{
                const {channel,message} = messageObject;

                console.log(`Message recieved. Channel: ${channel}. Message:${message}`);
            }
        };
    }
    publish({channel,message}){
        this.pubnub.publish({channel,message});
    }
}
const testPubSub = new PubSub();
testPubSub.publish({channel: CHANNELS.TEST,message:'hello pubnub'});
module.exports = PubSub;