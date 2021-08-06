const http = require('http');
const path = require("path");
const fs = require("fs");
const cluster = require("cluster");
const os = require("os");


if(cluster.isMaster) {
    console.log(`master ${process.pid} is running`);
    for(let i = 0; i < os.cpus().length; i++) {
        console.log("Forking process number", i);
        cluster.fork();
    }
} else {
    console.log(`worker ${process.pid} is running`);

    const filePath = path.join(__dirname, "index.html");
    const readStream = fs.createReadStream(filePath);

    const server = http.createServer((request, response) => {
        setTimeout(() => {
            console.log(`worker ${process.pid} handle request`);
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            readStream.pipe(response);
        }, 5000);
    });

    server.listen(3000);
}


