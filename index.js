const express = require("express"); //getting express
const port = 8080; //port number on which our server runs
const app = express(); //intializing express
const users = require("./USERS_DATA.json"); //getting our users data
const fs = require("fs");
app.use(express.urlencoded({ extended: false })); //middleware

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

/*
Task:3
create a new user
*/
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./USERS_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "ok", id: users.length + 1 });
  });
});

//starting our app
app.listen(port, () => {
  console.log("App is listening on port " + port);
});
