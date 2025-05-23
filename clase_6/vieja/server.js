import { log } from "console";
import http from "http";

const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

server.listen(8080, () => {
  log("Server running on port 3000");
});
