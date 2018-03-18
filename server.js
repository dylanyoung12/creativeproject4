const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({credentials: true, origin: true}));

let user = '';
let accounts = [];
let items = [];
let id = 0;

// Test account
user = 'user';
accounts.push({username:'user', password:'pass'});
items[user] = [];

app.post('/api/register', (req, res) => {
  let account = {username:req.body.username, password:req.body.password};
  if (accounts.map(item => item.username).includes(account.username)) {
    res.status(400).send('Username already taken');
    return;
  }
  accounts.push(account);
  user = account.username;
  items[user] = [];
  id = 0;
  console.log(user);
  res.send(items[user]);
});

app.put('/api/login', (req, res) => {
  let account = {username:req.body.username, password:req.body.password};
  if (!accounts.map(item => item.username).includes(account.username)) {
    res.status(400).send('Account not found');
    return;
  }
  user = account.username;
  id = items[user].length - 1;
  console.log(user);
  res.send(items[user]);
});


app.get('/api/items', (req, res) => {
  if (user === '') {
    res.send([]);
  }
  res.send(items[user]);
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items[user].map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[user][index];
  item.title = req.body.title;
  item.author = req.body.title;
  item.read = req.body.read;
  // handle drag and drop re-ordering
  if (req.body.orderChange) {
    let indexTarget = itemsMap.indexOf(req.body.orderTarget);
    items[user].splice(index,1);
    items[user].splice(indexTarget,0,item);
  }
  res.send(item);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {id:id, title:req.body.title, author:req.body.author, read:req.body.read};
  items[user].push(item);
  res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items[user].map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items[user].splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3030, () => console.log('Server listening on port 3030!'))
