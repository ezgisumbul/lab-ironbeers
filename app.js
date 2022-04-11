const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here
//hbs.registerPartials(__dirname + '/views/partials');

hbs.registerPartials(path.join(__dirname, 'views/partials')); // to prevent slash missing etc. issues we can use join method of node

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Ironbeers' });
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log('Beers from the database: ', beers);
      res.render('beers', { pageTitle: 'Beers', beers: beers });
    })
    // .then(beers => {
    //   res.render('beers', { pageTitle: 'Beers', beers: beers });
    // })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beers => {
      // const beer = beers[0]; // code refactored to use partials
      console.log('Beers from the database: ', beers);
      res.render('random-beer', {
        pageTitle: 'Random Beer',
        beers: beers
      });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(beers => {
      res.render('single-beer', { beers });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
