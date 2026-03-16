const http = require("http");

const server = http.createServer((req,res)=>{
    res.write("Hello from Docker CI/CD!");
    res.end();
});

server.listen(3000);