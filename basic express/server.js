import express from "express";
import bodyParser from "body-parser";

const app = express();

//middleware creation
const logger = (req, res, next) => {
    console.log(`request url is ${req.url} and request method is ${req.method}`)
    next()
}

//middleware declaration global
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger)


let startingId = 0
let users = [
    {
        id: 1,
        username: "gokue",
        password: "123456"
    },
    {
        id: 2,
        username: "gokue",
        password: "123456"
    },
    {
        id: 3,
        username: "gokue",
        password: "123456"
    }
]


//routes

app.get('/', (req, res) => {
    res.send("Home");
});

app.get('/users/:name', (req, res) => {
    console.log(req.params)
    //if name = req.params.name
    //do this logic
    res.json(users[req.params.id])
})

app.get('/data', logger, (req, res) => {

    res.json(users)
})

app.get('/secret', (req, res) => {
    res.status(403).end(); // 403 means Forbidden
})

app.get('*', (req, res) => {
    res.status(404).send('Error 404 Page not found')
})

app.post('/login', (req, res) => {
    //destructuring
    //making username and password variables from req.body
    const { username, password } = req.body



    users.forEach((user) => {
        //conditional to check if user is existing
        if (user.username === username) {
            //password validation
            if (user.password === password) {
                res.send("Okayy")
            }
            else {
                res.send("Password is incorrect")
            }
        }
        else {
            res.send("User not found")
        }
    })
});

app.post('/changepassword', (req, res) => {
    const { id, newPassword } = req.body

    users.forEach((user) => {
        //conditional to check if user is existing
        if (user.id === id) {
            //passwording chaging
            user['password'] = newPassword
            res.send(user)
        }
        else {
            res.send("User not found")
        }
    })

})

app.post('/register', (req, res) => {
    const { username, password } = req.body
    startingId += 1

    users.push({
        id: startingId,
        username,
        password
    })

    //send created status
    res.status(201).send(`${username} is created`)
})


//listen to server
app.listen(8000, () => {
    console.log("server started http://localhost:8000");
})