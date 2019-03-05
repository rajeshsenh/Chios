var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.post( '/edittaskstodisplay' , ( req , res , next ) => {

  let ID = req.body.edittaskid,
  QUERY_FOR_TASK = `SELECT task from mytasks WHERE id = ${ID}`;

  RESPONSE_DATA = {

  }

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'indegene@123',
    database : 'mytasks'
  });
  
  connection.connect()
  
  connection.query( QUERY_FOR_TASK  , function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
  });  

});


router.post( '/updatetasktodisplay' , ( req , res , next ) => {

  QUERY_FOR_UPDATETASK = `UPDATE mytasks SET mytasks.task = "${req.body.updatetasktext}" WHERE mytasks.id = ${req.body.updatetaskid}` ;

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'indegene@123',
    database : 'mytasks'
  });
  
  connection.connect()
  
  connection.query( QUERY_FOR_UPDATETASK  , function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
  });  

});



/* GET home page. */
router.get('/', function(req, res, next) {
  
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'indegene@123',
    database : 'mytasks'
  });

  // var connection = mysql.createConnection({
  //   host     : 'localhost',
  //   user     : 'root',
  //   password : '',
  //   database : 'mytasks'
  // });
  
  connection.connect( );
  
  // connection.query('SELECT tag from mytags', function (err, rows, fields) {
  //   if (err) throw err
  
  //   console.log( rows );
    
  //   res.render('index', { tags : rows });
  
  // });

  
  connection.query('SELECT tag from mytags', function (err, rows, fields) {
    if (err) throw err
  
    console.log( rows );
    
    res.render('index', { tags : rows });
  
  });
  
  
  // connection.end();

    //res.render('index', 'LOL');

});


router.post( '/addnewtask' , ( req , res , next ) => {

  let QUERYINSERTTASK = `INSERT INTO mytasks (task) VALUES( "${req.body.task}" )`;
  QUERYINSERTTAGS = `INSERT INTO mytasks_mytags (mytags_id , mytasks_id) VALUES( ( SELECT tag_id FROM mytags WHERE tag = "${req.body.tags}" ) , LAST_INSERT_ID() )`;

  // console.log(QUERYINSERTTASK);
  // console.log(QUERYINSERTTAGS);

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'indegene@123',
    database : 'mytasks'
  });
  
  connection.connect()
  

  connection.query( QUERYINSERTTASK  , function (err, rows, fields) {
    if (err) throw err;

    connection.query( QUERYINSERTTAGS  , function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });

  });

});


router.post( '/gettaskstodisplay' , ( req , res , next ) => {
  let data = null;
  // let QUERY = "SELECT id , task from mytasks";
  let QUERY = `SELECT mytasks.id , mytasks.task , GROUP_CONCAT(  mytags.tag  ) AS tags
	    FROM mytasks_mytags 
	    INNER JOIN mytasks ON mytasks_mytags.mytasks_id = mytasks.id
	    INNER JOIN mytags ON mytasks_mytags.mytags_id = mytags.tag_id
      GROUP BY mytasks.id , mytasks.task`
   
  /*var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'indegene@123',
    database : 'mytasks'
  }); */

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'indegene@123',
    database : 'mytasks'
  });
  
  connection.connect()

  connection.query( QUERY  , function (err, rows, fields) {
    if (err) throw err
    data = rows;  

    console.log(data);

    res.send(data);
  });
  
  connection.end();

});






// DELETE THIS ROUTE..
router.get( '/checkquery' , ( req , res , next ) => {

  let RESPONSE_DATA = {

  }

  let QUERY = "SELECT mytags_id FROM mytasks_mytags WHERE mytasks_id = '31'";

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mytasks'
  });
  
  connection.connect();

  connection.query( QUERY  , function ( err, rows, fields ) {
    if (err) throw err
    
    let mytag_id_array = rows.map( ( _e ) => _e.mytags_id );

    connection.query( "SELECT tag_name FROM mytags WHERE tag_id IN ( " + mytag_id_array.join(' , ') + " )"  , function (err, rows, fields) {
      if (err) throw err
      console.log(rows);
    });

    res.send(data);

  });
  

});

router.post( '/deletetaks' , ( req , res , next ) => {

  let QUERY = "DELETE FROM mytasks WHERE ID = '" + req.body.deleterecordid + "'";

  console.log(QUERY);

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'indegene@123',
    database : 'mytasks'
  });
  
  connection.connect();

  connection.query( QUERY  , function (err, rows, fields) {
    if (err) throw err
  
    console.log( rows );
  })
  
  connection.end();

  res.send('SUCCESS');
});

module.exports = router;
