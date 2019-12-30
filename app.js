const getRecipe = require('./utils/foodRecipe');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'))
app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, response) => {
  response.render('templates/home', {
    title: 'Recipes',
    name: 'okok'
  });
});

app.post('/food-key', async (request, response) => {

  const { body: { word } } = request;

  if (!word) {
    // return response.send('Provide a keyword');
  } else {
    try {
      const recipes = await getRecipe(word);
      response.render('templates/recipes', {
        recipes,
        name: 'okok',
        title: 'Recipes'
      });
    } catch (error) {
      console.log(error);
    }
  }
});

app.listen(port, () => {
  console.log('Server is up');
});




