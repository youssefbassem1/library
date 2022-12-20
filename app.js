var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
const e = require('express');
const session = require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3030;

app.use(
  session({
    secret: 'shh',
    resave: false,
    saveUninitialized: true
  })
);



app.get('/', function(req,res){
  res.render('login')

});

app.post('/',function(req,res){
  if(!req.body.username  || !req.body.password)
  return res.send({
    error: 'Please enter correct username and password or register a new account'
  });
  
  let x = {username:req.body.username, password: req.body.password , readinglist:[]};
  try { var data=fs.readFileSync('users.json');
  var datas=JSON.parse(data);
  const u = datas.find(user=>user.username === x.username && user.password === x.password);
  if(datas.find(user=>user.username === x.username && user.password === x.password)){
    req.session.username=u.username;
    req.session.password=u.password;
    req.session.readinglist=u.readinglist;
    console.log(req.session.readinglist);
    res.render('home');}
    else 
    return res.send({
      error: 'Please enter correct username and password or register a new account'
    });

  }
  catch(error)
  {return res.send({
    error: 'Please enter correct username and password or register a new account'
  });}
});

app.get('/dune', function(req,res){
  res.render('dune')

});

app.get('/fiction', function(req,res){
  res.render('fiction')

});

app.get('/flies', function(req,res){
  res.render('flies')

});

app.get('/grapes', function(req,res){
  res.render('grapes')

});

app.get('/home', function(req,res){
  res.render('home')

});

app.get('/index', function(req,res){
  res.render('index')

});

app.get('/leaves', function(req,res){
  res.render('leaves')

});



app.get('/mockingbird', function(req,res){
  res.render('mockingbird')

});

app.get('/novel', function(req,res){
  res.render('novel')

});

app.get('/poetry', function(req,res){
  res.render('poetry')

});

app.get('/readlist', function(req,res){
 // req.session.readinglist=req.session.readinglist.concat(["Dunes"]);
  //console.log(req.session.readinglist);
  res.render('readlist',{readinglist: req.session.readinglist})
  /*for(let i = 0;i<x.length;x++){
    if(req.session.user.)
  }
  res.render('readlist')*/

});



app.post('/adddune',function(req,res){
  
  var data=fs.readFileSync('users.json');
  var datas=JSON.parse(data);
  const u = datas.find(user=>user.username === req.session.username && user.password === req.session.password);
    if(!req.session.readinglist.find(book=>book === req.body.book))
    {
      u.readinglist.push(req.body.book);
     
    req.session.readinglist=u.readinglist;
    fs.writeFileSync('users.json',JSON.stringify(datas));
    }

    res.redirect('/home')
 
  });


  app.post('/addflies',function(req,res){
  
    var data=fs.readFileSync('users.json');
    var datas=JSON.parse(data);
    const u = datas.find(user=>user.username === req.session.username && user.password === req.session.password);
      if(!req.session.readinglist.find(book=>book === req.body.book))
      {
        u.readinglist.push(req.body.book);
       
      req.session.readinglist=u.readinglist;
      fs.writeFileSync('users.json',JSON.stringify(datas));
      }
      res.redirect('/home')
   
    });

  app.post('/addsun',function(req,res){
  
    var data=fs.readFileSync('users.json');
    var datas=JSON.parse(data);
    const u = datas.find(user=>user.username === req.session.username && user.password === req.session.password);
      if(!req.session.readinglist.find(book=>book === req.body.book))
      {
        u.readinglist.push(req.body.book);
       
      req.session.readinglist=u.readinglist;
      fs.writeFileSync('users.json',JSON.stringify(datas));
      }
      res.redirect('/home')
   
    });
    app.post('/addleaves',function(req,res){
  
      var data=fs.readFileSync('users.json');
      var datas=JSON.parse(data);
      const u = datas.find(user=>user.username === req.session.username && user.password === req.session.password);
        if(!req.session.readinglist.find(book=>book === req.body.book))
        {
          u.readinglist.push(req.body.book);
         
        req.session.readinglist=u.readinglist;
        fs.writeFileSync('users.json',JSON.stringify(datas));
        }
       
        res.redirect('/home')
      });

      app.post('/addmocking',function(req,res){
  
        var data=fs.readFileSync('users.json');
        var datas=JSON.parse(data);
        const u = datas.find(user=>user.username === req.session.username && user.password === req.session.password);
        var read = u.readinglist
          if(!(read.find(book=>book === req.body.book)))
          {
            u.readinglist.push(req.body.book);
           
          req.session.readinglist=u.readinglist;
          fs.writeFileSync('users.json',JSON.stringify(datas));
          }
          res.redirect('/home')
        });
   app.post('/addgrapes',function(req,res){
  
    var data=fs.readFileSync('users.json');
    var datas=JSON.parse(data);
   const u = datas.find(user=>user.username === req.session.username && user.password === req.session.password);
      if(!req.session.readinglist.find(book=>book === req.body.book))
         {
          u.readinglist.push(req.body.book);
             
        req.session.readinglist=u.readinglist;
        fs.writeFileSync('users.json',JSON.stringify(datas));
        }
           
        res.redirect('/home')
        });
app.get('/registration', function(req,res){
  res.render('registration')

});




app.post('/register',function(req,res){

try {

  let x = {username:req.body.username, password: req.body.password , readinglist:[]};
  if(!x.password || !x.username)
  return res.send({
    error: 'Please enter a username and a password'
  });
  var data=fs.readFileSync('users.json');
  var datas=JSON.parse(data);
  if(datas.find(user=>user.username === x.username)){
    return res.send({
      error: 'This username is used before'
    });
  }
  else
  {datas.push(x);
  var stringifieddata = JSON.stringify(datas);
  fs.writeFileSync("users.json",stringifieddata);}
  
}
 catch (error) {
  var x = [{username:req.body.username, password: req.body.password, readinglist: [] }];
  var stringx=JSON.stringify(x);
  fs.writeFileSync("users.json",stringx);
}

  res.redirect('/');
});


app.get('/searchresults', function(req,res){
  res.render('searchresults')

});

app.post('/search',function(req,res){
 // console.log(req.body);
const books = ['Lord of the Flies','The Grapes of Wrath','Leaves of Grass','The Sun and Her Flowers','Dune','To Kill a Mockingbird'];
const links= ['http://localhost:3000/flies','http://localhost:3000/grapes','http://localhost:3000/leaves',
'http://localhost:3000/sun','http://localhost:3000/dune','http://localhost:3000/mockingbird'];
const matches = books.filter(s => s.toLowerCase().includes(req.body.Search.toLowerCase()));
var result=[];
//const array3 = array1.concat(array2);
for(let y=0;y<matches.length;y++) {
for(let z=0;z<books.length;z++){
  if(matches[y] === books[z])
  result= result.concat([links[z]]);

}
}
res.render('searchresults',{matches,result});
console.log(result);
  });

app.get('/sun', function(req,res){
  res.render('sun')

});
//app.listen(3000);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});