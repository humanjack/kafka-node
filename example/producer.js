var kafka = require('../kafka'),
    Producer = kafka.Producer,
    Client = kafka.Client,
    client = new Client();

var producer = new Producer(client);

var letters = 'abcdefghijklmnopqrstuvwxyz',
    upcaseLetters = letters.toUpperCase(),
    numbers = '1234567890';

var dictionary = letters + upcaseLetters + numbers;

function createMsg() {
    var digit = 2048 + Math.floor(Math.random() * 2048);
    var charsNum = dictionary.length;
    var n = Math.floor(digit / charsNum);
    var n1 = digit % charsNum;

    var ret = ''
    for (var i = 0; i < n; i++) {
        ret += dictionary;
    }
    return ret + dictionary.slice(n1);
}

var count = 1, rets = 0;
producer.on('ready', function () {
   setInterval(send, 1000); 
});

function send() {
    for (var i = 0; i < count; i++) {
        producer.send([
            {topic: 'topic1', messages: ['777777777777777' + 1 + 'coolmessage'] },
            {topic: 'topic2', messages: ['777777777777777' + 2 + 'coolmessage'] }
        ], function (err, data) {
            if (err) console.log(arguments);
            else console.log(data);
            //if (++rets === count) process.exit();
        });
    }
}
