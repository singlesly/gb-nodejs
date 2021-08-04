const EventEmitter = require('events');

const RequestTypes = [
    {
        type: 'send',
        payload: 'to send a document'
    },
    {
        type: 'receive',
        payload: 'to receive a document'
    },
    {
        type: 'sign',
        payload: 'to sign a document'
    }
];

class Customer {
    constructor({type, payload}) {
        this.type = type;
        this.payload = payload;
    }
}

const generateIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const delay = (ms) => {
    return Promise.resolve(resolve => setTimeout(resolve, ms));
}

const generateNewCustomer = () => {
    const params = RequestTypes[generateIntInRange(0, RequestTypes.length -1)];

    return new Customer(params);
}

class Handler {
    static send(payload) {
        console.log("Send request", payload)
    }
    static receive(payload) {
        console.log("Receive request", payload)
    }
    static sign(payload) {
        console.log("Sign request", payload)
    }
    static pay(payload) {
        console.log("Pay document");
    }
}

const emitter = new EventEmitter();

emitter.on("send", Handler.send);
emitter.on("receive", Handler.receive);
emitter.on("error", (err) => {
    console.log(err);
})
emitter.on("sign", () => {
    emitter.emit("error", "Ручка перестала писать!")
});


const run = async () => {
    const customer = await generateNewCustomer();

    emitter.emit(customer.type, customer.payload);
    await new Promise(resolve => setTimeout(resolve, 5000));
    await run();
}

run();

