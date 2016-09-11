var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/TFChess';
var client = new pg.Client(connectionString);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Iniciar Sesión' });
});

router.post('/login', function(req, res, next) {
	console.log("Verificando usuario");
  res.render('login', { title: 'Iniciar Sesión' });
  const user = req.body;
	client.connect();
	client.query("INSERT INTO usuarios(id, name, password, score) VALUES(DEFAULT,$1,$2,$3)",
		[user.name, user.password, 0],
	 	function (err, result) {
	    if (err!=null) {
	    	res.render('error',{error:err});
	    }else{
	    	console.log(result.rows);
	    	res.render('dashboard', { title: 'LFLChess', name:user.name});
	    }
		}
	);
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: '¡ Regístrate !' });
});

router.post('/signup', function(req, res, next) {
	const user = req.body;
	client.connect();
	client.query("INSERT INTO usuarios(id, name, password, score) VALUES(DEFAULT,$1,$2,$3)",
		[user.name, user.password, 0],
	 	function (err, result) {
	    if (err!=null) {
	    	res.render('error',{error:err});
	    }else{
	    	console.log(result.rows);
	    	res.render('dashboard', { title: 'LFLChess', name:user.name});
	    }
		}
	);
});
module.exports = router;
