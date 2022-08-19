//imports
import express from "express";
import bodyParser from "body-parser";

//express initilization
const app = express()
const port = 8080

//midwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files
app.use(express.static('public'))
app.use('css', express.static('public/css', { root: '.' }))
app.use('js', express.static('public/js', { root: '.' }))
app.use('img', express.static('public/img',{ root: '.' }))

// set views
app.set('views', './views')
app.set('view engine', 'ejs')

//views and routes
app.get('', (req, res) => {
    res.render('index', { text: 'this is ejs', users: ['goku', 'vegeta' , 'gohan']})
})

app.get('/about', (req, res) => {
    res.render('about', { text: 'about page' , users: ['goku', 'vegeta' , 'gohan']})
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    const { username } = req.body
    //do logic here either add sa database
    res.send(username +' registered')
})

//listen on port 5000
app.listen(port, () => {
    console.log("Server started on port 8080")
})