var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.post( '/edittaskstodisplay' , ( req , res , next ) => {

  let ID = req.body.edittaskid;

  let QUERY_FOR_TASK = `SELECT task from mytasks WHERE id = ${ID}`,
  QUERY_FOR_TAG_IDS = `SELECT mytags_id FROM mytasks_mytags WHERE mytasks_id = ${ID}`,
  RESPONSE_DATA = {

  }

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mytasks'
  });
  
  connection.connect()
  
  connection.query( QUERY_FOR_TASK  , function (err, rows, fields) {

      RESPONSE_DATA['task'] = rows[0].task;

      connection.query( QUERY_FOR_TAG_IDS  , function (err, rows, fields) {
          if (err) throw err
        
          let mytag_id_array = rows.map( ( _e ) => _e.mytags_id );

          connection.query( "SELECT tag_name FROM mytags WHERE tag_id IN ( " + mytag_id_array.join(' , ') + " )"  , function (err, rows, fields) {
            if (err) throw err

            let tagArray = rows.map( ( _e ) => _e.tag_name );

            console.log(tagArray);  
            RESPONSE_DATA['tags'] = [ ...tagArray ];
            console.log(RESPONSE_DATA);
            res.send(RESPONSE_DATA);

          }); 

      }); 

  });  


  
  //connection.end();

});



/* GET home page. */
router.get('/', function(req, res, next) {

  var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'gautam',
    password : 'indegene@123',
    database : 'gautam'
  });

  // var connection = mysql.createConnection({
  //   host     : 'localhost',
  //   user     : 'root',
  //   password : '',
  //   database : 'mytasks'
  // });
  
  connection.connect()
  
  connection.query('SELECT tag_name from mytags', function (err, rows, fields) {
    if (err) throw err
  
    console.log( rows );
    
    res.render('index', { tags : rows });
  
  });

  /*
  connection.query('SELECT tag_name from mytags', function (err, rows, fields) {
    if (err) throw err
  
    console.log( rows );
    
    res.render('index', { tags : rows });
  
  });
  */
  
  connection.end();

});


router.post( '/addnewtask' , ( req , res , next ) => {
  // console.log( req.body );

  let data = null;
  let QUERY = "INSERT INTO mytasks (task) VALUES ('"+ req.body.task +"')";

  console.log( req.body.tags );

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mytasks'
  });
  
  connection.connect()
  

  connection.query( QUERY  , function (err, rows, fields) {
    if (err) throw err


    //let tags = req.body.tags.map( ( _e ) => { return "'" + _e + "'" } );

    console.log(req.body.tags.join(' , '));

    let QUERY2 = "INSERT INTO mytasks_mytags ( mytags_id , mytasks_id ) SELECT tag_id, "+ rows.insertId +" FROM mytags WHERE tag_name IN ( "+ req.body.tags.join(' , ') +" )";

    console.log(QUERY2);

    connection.query(  QUERY2  , function (err, rows, fields) {
      if (err) throw err

      console.log(rows);

    }); 

    res.send(data);
  });

});


router.post( '/gettaskstodisplay' , ( req , res , next ) => {
  let data = null;
  let QUERY = "SELECT id , task from mytasks";

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mytasks'
  });
  
  connection.connect()

  connection.query( QUERY  , function (err, rows, fields) {
    if (err) throw err
    data = rows;  
    res.send(data);
  });
  
  connection.end();

});






// DELETE THIS ROUTE..
router.get( '/checkquery' , ( req , res , next ) => {
  // console.log( req.body );
  // console.log('LALA !');
  let RESPONSE_DATA = {

  }

  let QUERY = "SELECT mytags_id FROM mytasks_mytags WHERE mytasks_id = '31'";

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mytasks'
  });
  
  connection.connect()
  
  // let vv = req.body;

  connection.query( QUERY  , function (err, rows, fields) {
    if (err) throw err
    
    let mytag_id_array = rows.map( ( _e ) => _e.mytags_id );
    
    console.log(mytag_id_array);

    // console.log(rows);
    // console.log('INSERT ID IS : ' + rows.insertId);
    connection.query( "SELECT tag_name FROM mytags WHERE tag_id IN ( " + mytag_id_array.join(' , ') + " )"  , function (err, rows, fields) {
      if (err) throw err
      console.log(rows);
    });

    // console.log('INSERT ID IS : ' + rows.insertId)

    /*
    connection.query( 'SELECT LAST_INSERT_ID()'  , function (err, rows, fields) {
      if (err) throw err
      console.log(rows);
    }); 
    */  

    res.send(data);
  });
  
  // connection.end();

});

router.post( '/deletetaks' , ( req , res , next ) => {

  let QUERY = "DELETE FROM mytasks WHERE ID = '" + req.body.deleterecordid + "'";

  console.log(QUERY);

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
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
