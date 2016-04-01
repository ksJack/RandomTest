(function () {

  var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  _dir = 'C:/Users/WeekendDoto/Documents/MiscellaneousTest',
  path = require('path'),
  _sql = require('mssql'),
  _connectionstring = {
    user: 'test',
    password: 'Password',
    server: 'DOTO',
    database: 'Phoenix',

    option: {
      trustedConnection: true
    }
  }

  //libraries
  app.use(express.static(path.join(_dir, '/js')));

  var connection = new _sql.Connection(_connectionstring, function(err) {
      // ... error checks
      console.log('error: ' + err);

      var request = connection.request();

      request.query('select * from pPhoenixDBVersion', function(err, recordset) {
          console.log("recordSet: " + recordset[0].Minor);

          app.set('title', recordset[0].Minor);
      });

  });


  app.get('/', function(req, res) {
    // res.send('hello world');
    res.sendFile(path.join(_dir + '/main.html'));
  });

  app.get('/screw', function(req, res) {
    var user_id = req.query.id;
    console.log(req.query);

    res.send(user_id);

  });

  http.listen(8081, function(){
    console.log('listening on *:8081');
    //console.log(app.locals);
  });
})()
