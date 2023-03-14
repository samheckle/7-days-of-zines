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

app.listen(8000);