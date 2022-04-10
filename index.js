require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to balanche server application." });
});

app.use('/role', require('./src/routers/roles.router'));
app.use('/user', require('./src/routers/user.router'));
app.use('/userRoles', require('./src/routers/userRoles.router'));
app.use('/quests', require('./src/routers/quest.router'));
app.use('/auth', require('./src/routers/auth.router'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
