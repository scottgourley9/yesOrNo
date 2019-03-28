var express = require('express');

var bodyParser = require('body-parser');
var massive = require('massive');
var config = require('./config.js');
var connectionString = config.connectionString;

var db = massive.connectSync({connectionString : connectionString})
var app = module.exports = express();

app.set('db', db);

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

app.post('/auth/signup', function(req, res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {



  db.create_new_user([req.body.business, req.body.first, req.body.last, req.body.phone, req.body.email, hash], function(err, user){
    if(err){
      res.json({message: 'already taken'})
    }
    else {
      res.status(200).send({
        token: createJWT(user[0])
      })
    }
  })
  })
})

app.post('/auth/login', function(req, res){
  db.get_user([req.body.email], function(err, user){
      if (err) return res.status(500)
      if (!user[0]) {
        return res.send({
          message: 'Invalid email and/or password'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, function(err, resp) {
        if(resp) {
          res.send({
            token: createJWT(user[0])
          })
        }
        else {
          res.send({
            message: 'Invalid email and/or password'
          })
        }
      })



      })
    })

app.post('/api/customers', function(req, res){
  db.find_customer([req.body.phone, req.body.userid], function(err, theUser){
    console.log(theUser);
    if(!theUser.length){
      db.add_customer([req.body.first, req.body.last, req.body.phone, req.body.email, req.body.userid], function(err, success){
        if(err){
          res.status(500).json(err)
        }
        else {
          res.status(200).json(success[0])
        }

      })
    }
    else {
      res.json('customer already exists')
    }
  })

})

app.get('/api/customers/:userid', function(req, res){
  db.get_customers([req.params.userid], function(err, customers){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(customers)
    }
  })
})

app.get('/api/customer/:userid/:phone', function(req, res){
  db.get_customer([req.params.userid, req.params.phone], function(err, customer){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(customer)
    }
  })
})

app.delete('/api/customers/:id', function(req, res){
  db.delete_customer([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.put('/api/customers/:id', function(req, res){
  db.update_customer([req.params.id, req.body.first, req.body.last, req.body.phone, req.body.email], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.get('/api/user/:id', function(req, res){
  console.log(req.body);
  db.get_user_by_id([req.params.id], function(err, user){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(user)
    }
  })
})

// Links ENDPOINTS
app.get('/api/links/:id', function(req, res){
  db.get_links([req.params.id], function(err, links){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(links)
    }
  })
})

app.get('/api/link/:id', function(req, res){
  db.get_link([req.params.id], function(err, link){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(link)
    }
  })
})

app.post('/api/links', function(req, res){
  db.add_link([req.body.name, req.body.link, req.body.locationId], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.put('/api/links', function(req, res){
  db.update_link([req.body.id, req.body.name, req.body.link], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.delete('/api/links/:id', function(req, res){
  db.delete_link([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

// Message ENDPOINTS

app.post('/api/messages', function(req, res){
  db.add_message([req.body.senttime, req.body.message, req.body.linkid, req.body.userid, req.body.customerid, req.body.linktype], function(err, messageId){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(messageId[0])
    }
  })
})

app.get('/api/messages/:userId', function(req, res){
  db.get_messages([req.params.userId], function(err, messages){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(messages)
    }
  })
})

app.put('/api/positivemessage/:id', function(req, res){
  db.positive_message([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.put('/api/negativemessage/:id', function(req, res){
  db.negative_message([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.put('/api/complaint/:id', function(req, res){
  console.log(req.body);
  db.complaint([req.params.id, req.body.complaint], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})


app.listen(config.port, function(){
  console.log('listening on port ' + config.port);
})
