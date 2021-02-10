var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('student.db');

db.serialize(function() {
  //db.run("Server File Executed");
  // CREATE TABLE
  console.log('Creating table...');

  //   db.run(
  //     "create table Students (student_id INTEGER PRIMARY KEY AUTOINCREMENT,RollNumber varchar,student_Name Varchar,age int)"
  //   );
  //db.run("Insert into Students values(null,'0002','Ali',18,'image')");
  // console.log("Table created successfully");
  // CREATE ATTENDANCE TABLE
  // console.log("Creating table...");

  //db.run('ALTER TABLE Students ADD COLUMN image varchar');
  //db.run("drop table Students ");
  //db.run('update Students set img="avatar.jpg" where student_id=2 ');
  // db.run(
  //   "Insert into Students values(null,'0001','Ali',18,'Ikram','rwp','03121234567','3-12-2020','Avatar.jpg')"
  // );
  //   db.run(
  //     "Insert into Students values(null,'Zai',20,'Hussain','rwp','03121234567','3-12-2020')"
  //   );
  // DROPE TABLE QUERY
  // console.log("Deleting table...");
  // db.run("DROP TABLE Attendance");
  // console.log("Table deleted successfully");
});

db.close();
