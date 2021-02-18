const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/assets'));
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log('Unable to append file to server.log' + err);
        }
    });
    console.log(`${now}: ${req.method} ${req.url}`);
    next();

});

// app.use((req, res, next)=>{
// res.render('maintenance');
// });

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    res.render('home',{
        page:'Home Page',
        pageTitle:'Home Page',
        curentYear:new Date().getFullYear(),
        welcomeMessage:'Welcome to express js with hbs and axios and other fun stuff we shall be doing'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        page:'About Page',
        pageTitle:'About Page',
        curentYear:new Date().getFullYear()
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        error:'Unable to handle request'
    });
});

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
});