import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Database from "./utils/database";
import router from "./routes/api";

const main = () => {
  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const port = process.env.PORT || 3000;

  const database = new Database();

  app.get("/", async (req, res) => {
    res.status(200).send({
      status: true,
      message: "Welcome to the API",
      dbConnection: await database.connect(),
    });
  });

  app.use(router);

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

main();
