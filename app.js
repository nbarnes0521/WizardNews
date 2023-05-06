const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");

app.use(express.static('public'));

app.use(morgan('dev'));
// app.get("/", (req, res) => res.send("Hello World!"));

// Main Get request below
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
//Post NOT found route
  if (!post.id) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>404: Page Not Found :(</p>
      </div>
    </body>
    </html>`
    res.send(html)
  } else {

  // Findable sites
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
          <p>
            ${post.content} 
          </p>
        </div>
    </div>
  </body>
</html>`;

  res.send(html);
}
});

// 24 & 35
// Single Post Get request Below
app.get("/", (req, res) => {
  
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
          <p>
          View Post: <a href="/posts/${post.id}">${post.title}</a>
          </p>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`;

  res.send(html);
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

