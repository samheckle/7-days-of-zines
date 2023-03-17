import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Tell Express to look in the "public" folder for any files first
app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.render('home', {layout: false});
    res.render('home', {layout: 'main'});
});

app.get('/page-1', (req, res) => {
    // res.render('home', {layout: false});
    res.render('page1', {layout: 'p5'});
});

app.get('/page-2', (req, res) => {
    // res.render('home', {layout: false});
    res.render('page2', {layout: 'p5'});
});

app.get('/page-3', (req, res) => {
    // res.render('home', {layout: false});
    res.render('page3', {layout: 'p5'});
});

app.get('/page-4', (req, res) => {
    // res.render('home', {layout: false});
    res.render('page4', {layout: 'p5'});
});

app.get('/about', (req, res) => {
    // res.render('home', {layout: false});
    res.render('about', {layout: 'main'});
});

app.listen(8000);