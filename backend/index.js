const express = require('express');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('student.db');

var multer = require('multer');

const router = express.Router();

const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./images'));
const PORT = 8041;
const ip = '192.168.10.6';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
});

app.get('/', (req, res) => {
  res.send('hello world');
});

// GET FROM STUDENTS TABLE
app.get('/AllStudents', (req, res) => {
  console.log('All Students from index');
  db.all('Select * from Students', (err, row) => {
    if (row) {
      res.send(row);
    } else {
      res.status(404).send(err);
    }
  });
});

// INSERT INTO STUDENTS TABLE
app.post('/RegisterStudent', upload.single('image'), (req, res) => {
  console.log('req.body =', JSON.stringify(req.body), req.file);
  // console.log('req.file', req.file);
  db.all(
    'Insert into Students values(null,?,?,?,?)',
    [
      req.body.RollNumber,
      req.body.student_Name,
      req.body.age,
      req.file.originalname,
    ],
    (err, row) => {
      if (row) {
        res.status(200).json({msg: 'Successfully inserted'});
      } else {
        res.status(404).send(err);
      }
    },
  );
});

app.put(
  '/UpdateStudent/:student_id',
  upload.single('image'),
  (req, res, next) => {
    console.log('student_id from server', req.params.student_id);
    var reqBody = req.body;
    db.run(
      'UPDATE Students set RollNumber = ?, student_Name = ?, age = ?,image=? WHERE student_id = ?',
      [
        reqBody.RollNumber,
        reqBody.student_Name,
        reqBody.age,
        req.file.originalname,
        req.params.student_id,
        //  reqBody.student_id,
      ],
      function(err, result) {
        if (err) {
          res.status(400).json({error: err});
          return;
        }
        console.log('this.changes', this.changes);
        return res.status(200).json({student_id: 'this.changes'});
      },
    );
  },
);

app.delete('/delete/:id/', (req, res, next) => {
  console.log('deleted', req.params.id);
  db.run(`DELETE FROM Students WHERE student_id = ${req.params.id}`, function(
    err,
    result,
  ) {
    if (err) {
      res.status(400).json({error: res.message});
      return;
    }
    res.json({message: 'deleted', changes: this.changes});
  });
});

// LISTENING SERVER
app.listen(PORT, ip, () => {
  console.log('Server is listening at http://' + ip + ':' + PORT);
});
