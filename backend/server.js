const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/home"));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
