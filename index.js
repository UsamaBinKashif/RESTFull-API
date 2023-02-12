const express = require("express"); //getting express
const port = 8080; //port number on which our server runs
const app = express(); //intializing express
const users = require("./USERS_DATA.json"); //getting our users data

/*
Task:1
GET Request to get all the users
*/
app.get("/api/users", (req, res) => {
  res.json(users);
});
/*
Task:2
Generate HTML DOC
*/
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;

  res.send(html);
});
/*
Task:2
get the user of given ID for suppose ID:1
*/
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.send(user);
});

//starting our app
app.listen(port, () => {
  console.log("App is listening on port " + port);
});
