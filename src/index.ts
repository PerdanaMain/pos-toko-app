import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const main = () => {
  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.status(200).send({
      status: true,
      message: "Welcome to the API",
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

main();
