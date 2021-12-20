//* Actual server is express.
const express = require('express');

//* This automatically converts the request response return to JSON instead of having to parse it manually.
const bodyParser = require('body-parser');

//* Be able to use the .env file variables.
//* This is so you don't have to upload your API keys to a repo. You would just add the file to Openshift
//* Any variable in the .env file would be used like process.env.<YOUR VARIABLE NAME>
require('dotenv').config();

//* Connect to the POSTGRES db.
//* Connect with the CONNECTION_STRING variable from the .env file.
//* .env files won't be uploaded to gitlab
//* Create a .env file in the root and add a CONNECTION_STRING = <YOUR CONNECTION STRING> to be able to use this function.
const app = express();

var path = require('path');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../build'));

// //* Eventually make this route a public route in the translation service so every app can hit it.
// app.get("/api/v1/getLang", (req, res) => {
//   //* If there is an "accept-language" header get the first
//   if (req.headers["accept-language"]) {
//     res.status(200).json({
//       language: req.headers["accept-language"].split(";")[0].split(",")[0],
//     });
//   } else {
//     res.status(400).json({
//       error: {
//         message: "No Language Found",
//       },
//     });
//   }
// });

//* The port number to run the server;
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
const PORT = 8080;
//* This starts the server at localhost:4000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
