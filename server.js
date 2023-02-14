const express = require("express");
const app = express();
require("dotenv/config");
require("./config/db")();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/", userRoutes);

// Error Middlewares
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//Not found URL middleware
app.use(notFound);

//Error handler for the whole app
app.use(errorHandler);

const PORT = process.env.PORT || 5020;
app.listen(PORT, () => console.log("Server running on PORT " + PORT));
