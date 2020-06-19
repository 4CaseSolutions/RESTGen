/*
 * RESTGen
 * API REST generator
 * By: Neto Silva - 4Case Solutions
 * qui jun 17 19:47
 */
const app = require("fastify")({
  logger: true
});
const db = require("mongoose");
db.connect(
  `mongodb://127.0.0.1:27017/RESTGen`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const objSchema = new db.Schema(
  {
    name: String,
    createdAt: { type: Date, default: new Date() }
  },
  {
    collection: "objects",
    versionKey: false
  }
);

const objModel = db.model(
  "Object",
  objSchema
);

app.get("/objects", async (req, res) => {
  return await objModel.find({});
});

app.listen( 3000, "127.0.0.1")
.then( addr => console.log(`API runing in: ${addr}`))
.catch( err => console.error(`Houston, we have a problem | ${err}`));