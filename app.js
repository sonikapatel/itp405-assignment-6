var express = require('express');
var mysql = require('mysql');
var app = express();

app.get('/api/dvds/:id', function (request, response) {
  var connection = mysql.createConnection({
    host     : 'itp460.usc.edu',
    user     : 'student',
    password : 'ttrojan',
    database : 'dvd'
  });
  connection.connect();
  connection.query('SELECT title, award, genre_name, genre_id,rating_id,rating_name FROM dvds,genres,ratings WHERE ratings.id = dvds.rating_id AND dvds.genre_id = genres.id AND dvds.id = ?', [ request.params.id ], function(error, dvds) {
    if (error) {
      throw error;
    }

    var dvd = dvds[0];
    response.json({
      title: dvd.title,
      award: dvd.award,
      genre: {
          id: dvd.genre_id,
          genre_name: dvd.genre_name
      },
      rating:{
        rating:dvd.rating_id,
        rating_name: dvd.rating_name
      }
    });
      connection.end();

    });
});

app.listen(8000);
