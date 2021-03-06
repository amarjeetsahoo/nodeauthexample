const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('connected to db!');
    })

//middlewares
app.use(express.json());

//import routes
const authRoute = require('./routes/auth');
const posts = require('./routes/posts');

//route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', posts);

app.listen(3000, () => {
    console.log("Server is Running");
});