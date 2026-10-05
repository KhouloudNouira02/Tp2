const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const articles = [
  { id: 1, title: 'Welcome to the blog', author: 'Admin' },
  { id: 2, title: 'My first Express server', author: 'Aya' },
  { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];
const users = [
  { id: 1, name: 'khouloud', email: 'kh@gmail.com' },
  { id: 2, name: 'amira', email: 'amira@gmail.com' },
  { id: 3, name: 'Alice', email: 'alice@gmail.com' }
];


let nextId = 4;
app.get('/', (req, res) => {
  res.json({ message:'Hello World!' });
});


app.get('/api/articles', (req, res) => {
  res.json({total: articles.length, articles: articles});
});

app.get('/api/articles/:id', (req, res) => {
  const articleId = Number(req.params.id);
  const article = articles.find(a => a.id === articleId);
  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }
  res.json(article);
});

app.get('/api/articles', (req, res) => {
    const { author } = req.query;

    let result = articles;

    if (author) {
        result = articles.filter(a => a.author === author);
    }

    res.json({ total: result.length,articles: result });
});
app.post('/api/articles', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }
  const newArticle = { 
    id: nextId, 
    title: title, 
    author: author 
  };
  
  nextId = nextId + 1; 
  articles.push(newArticle);


  res.status(201).json({ 
    message: 'Article created', 
    article: newArticle 
  });
});
app.get('/api/users', (req, res) => {
  const{name} = req.query;
  let result = users;

  if (name) {
    result = result.filter(u => u.name === name);
  }
  res.json({total: result.length, users: result});
});

app.get('/api/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

app.post('/contact', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  res.status(200).json({ message: "success" });
});

app.get('/about', (req, res) => {
  res.json({
    appName: "App Express",
    author: "Nouira khouloud",
    version: "1.0.0"
  });
});


app.listen(port, () => {
  console.log(`server disponible sur http://localhost:${port}`);
});