/*
 * RESTGen
 * API REST generator
 * By: Neto Silva - 4Case Solutions
 * qui jun 17 19:47
 */
const app = require("fastify")({
  logger: true
});

app.get("/objects", (req, res) => {
  res.send([
    { object: "Hello"},
    { object: "World"},
  ]);
});

app.listen( 3000, "127.0.0.1")
.then( addr => console.log(`API runing in: ${addr}`))
.catch( err => console.error(`Houston, we have a problem | ${err}`));