const express = require('express');
const path = require('path'); //패스 모듈
const mysql = require('sync-mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const DaoEmp = require('./daoemp');
const daoEmp = new DaoEmp();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //
app.engine('html', require('ejs').renderFile); //html 렌더 가능

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 정적 폴더 나누기
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.redirect('/index.do');
});

app.get('/index.do', (req, res) => {
    res.render('index.html');
});

// emp 리스트
app.get('/emp_list.ajax', (req, res) => {
    const list = daoEmp.selectList();
    res.json(list);
});

app.get('/emp_detail.ajax', (req, res) => {
    const id = req.query.e_id;
    const vo = daoEmp.selectOne(id);
    res.json(vo);
});


app.post('/emp_add.ajax', (req, res) => {
    daoEmp.insert(req.body);
    res.json({success: true});
});

app.post('/emp_mod.ajax', (req, res) => {
    const cnt = daoEmp.update(req.body);
    res.json({ success: cnt === 1, cnt });
});
app.post('/emp_del.ajax', (req, res) => {
    const cnt = daoEmp.delete(req.body.e_id);
    res.json({ cnt });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


