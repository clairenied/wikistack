const express = require('express')
const app = express()

const morgan = require('morgan')
const router = require('./routes')
// const wikiRouter = require('./routes/wiki')

const bodyParser = require('body-parser')

const nunjucks = require('nunjucks')

const models = require('./models')

app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'html')
app.engine('html', nunjucks.render)
nunjucks.configure('views', { noCache: true })


models.db.sync({ force: true })
.then(function () {
  app.listen(3001, function () {
      console.log('Server is listening on port 3001!');
  });
})
.catch(console.error);

app.use('/', router);
