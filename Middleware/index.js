const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'))
app.use((req,res,next) =>{
    next();
})
app.use((req,res, next) => {
    const { password } =req.query;
    if (password === 'chickennugget') {
        next();
    }
    res.send('SORRY YOU NEED A PASSWORD!!')
})

app.get('/', (req, res) => {
    res.send('home')
})

app.get('/dogs', (req, res) => {
    res.send('woof')
})

app.use((req,res) => {
    res.status(404).send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})