const ACCESS_LOG = "access.log";

function readFile() {

    const fs = require('fs');
    const fsPromises = require('fs/promises');

    fs.readFile(
        "./access.log",
        "utf-8",
        (err, data) => {
            console.log(data);
        });

    const data = fs.readFileSync("./access.log", 'utf8');

    console.log(data);

    fsPromises
        .readFile("./access.log", "utf8")
        .then(data => console.log(data));
}

function writeFile() {
    const fs = require('fs');

    const Requests = [
        `127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
        `127.0.0.1 - - [30/Jan/2021:11:11:25 -0300] "GET /boo HTTP/1.1" 404 0 "-" "curl/7.47.0"`
    ];

    fs.writeFileSync(
        ACCESS_LOG,
        "\n",
        { flag: "a" }
    )

    fs.writeFile(
        ACCESS_LOG,
        Requests[0] + "\n",
        {
            flag: "a",
            encoding: "utf8"
        },
        console.log
    );

    fs.appendFile(
        ACCESS_LOG,
        Requests[0] + "\n",
        console.log
    );
}

function readStream() {
    const stream = require("stream");
    const fs = require("fs");


    const readStream = fs.createReadStream(ACCESS_LOG, {
        flags: "r",
        highWaterMark: 1024
    });

    readStream.on("data", (chunk) => {
        console.log(chunk);
    });

    readStream.on("end", () => console.log('finished'));
    readStream.on("error", (err) => console.log(err));
}

function writeStream() {
    const fs = require("fs");

    const Requests = [
        `127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
        `127.0.0.1 - - [30/Jan/2021:11:11:25 -0300] "GET /boo HTTP/1.1" 404 0 "-" "curl/7.47.0"`
    ];

    const writeStream = fs.createWriteStream(ACCESS_LOG, {
        encoding: "utf8",
        flags: "a"
    });

    Requests.forEach(log => {
        writeStream.write("\n");
        writeStream.write(log);
    });

    writeStream.end(() => console.log('finished'));
}

function transformStream() {
    const { Transform } = require("stream");
    const fs = require("fs");

    const readStream = fs.createReadStream(ACCESS_LOG);

    const tStream = new Transform({
        transform(chunk, encoding, callback) {
            const paidIp = /127.0.0.1/g;
            const transformed = chunk
                .toString()
                .replace(/\d+.\d+.\d+.\d+/g, '[Pay 100 rub to see ip)]');
            this.push(transformed);
            callback();
        }
    });

    readStream.pipe(tStream).pipe(process.stdout);
}

transformStream();
