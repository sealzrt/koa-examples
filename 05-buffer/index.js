// const http = require('http');
//
// let hello = '';
// for (var i = 0; i < 10240; i++) {
//   hello += 'a';
// }
//
// console.log(`Hello：${hello.length}`);
// // hello = Buffer.from(hello);
//
// http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end(hello);
// }).listen(8001);



let buf = Buffer.from('hello哈', 'utf8');
console.log(buf);
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf.length); // 5
console.log(buf[0], buf[1], buf[2], buf[3]); // 104
