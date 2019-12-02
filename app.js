const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./mainRouter');
const middleware = require('./middleware/common');
var jwt = require('express-jwt');
var unless = require('express-unless')


require('dotenv/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(jwt({ secret: 'owner'}).unless({path: ['/login']}));


app.get('/', (req, res)=> {
    res.send('hello world')
  })
app.use(mainRouter);

app.use(middleware.errorWrongRoute);

app.use(middleware.errorHandler);

var port = process.env.PORT || 3060
app.listen(port, () => {
  console.log(`API is listenig on port ${port}!`)
});