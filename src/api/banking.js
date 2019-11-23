const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const db = mysql.createConnection({
	host: '208.91.199.125',
	user: 'thewizar_dskbank',
	password: '4567890321',
	database: 'thewizar_bank',
	multipleStatements: true
});

db.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Database has connected successfully!!!');
	}
});

router.post('/users/add', async (req, res) => {
	let user = req.body;
	let sql = 'INSERT INTO users SET ?';
	let query = db.query(sql, user, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

router.post('/statements/add/:id', async (req, res) => {
	let statement = {
		reg_id: req.params.id,
		particulars: req.body.particulars,
		deposited: req.body.deposited,
		withdrawn: req.body.withdrawn,
		ttl_amount: req.body.deposited - req.body.withdrawn
	};
	let sql = 'INSERT INTO statements SET ?';
	let query = db.query(sql, statement, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

router.get('/users/:id', async (req, res) => {
	let id = req.params.id;
	let sql = `SELECT * FROM users WHERE reg_id = ${id}`;
	let query = db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

router.get('/statements/:id', async (req, res) => {
	let id = req.params.id;
	let sql = `SELECT * FROM statements WHERE reg_id = ${id}`;
	let query = db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

router.delete('/statements/del/:id', async (req, res) => {
	let id = req.params.id;
	let sql = `DELETE FROM statements WHERE id = ${id}`;
	let query = db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

router.put('/statements/upd/:id', async (req, res) => {
	let id = req.params.id;
	let statement = {
		particulars: req.body.particulars,
		deposited: req.body.deposited,
		withdrawn: req.body.withdrawn,
		ttl_amount: req.body.deposited - req.body.withdrawn
	};
	let sql = `UPDATE statements SET ? WHERE id = ${id}`;
	let query = db.query(sql, statement, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

module.exports = router;
