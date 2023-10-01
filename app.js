const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import kết nối đến MySQL từ tệp db.js

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Hiển thị trang HTML để nhập thông tin thành viên
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Xử lý POST request để thêm bản ghi vào tblMembers
app.post('/add-member', (req, res) => {
  const { Name, Email, Gender, Password, DateOfBirth } = req.body; // Body gồm những trường này
  const query = `INSERT INTO tblMembers (Name, Email, Gender, Password, DateOfBirth) VALUES (?, ?, ?, ?, ?)`; 
  const values = [Name, Email, Gender, Password, DateOfBirth];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding record:', err);
      res.status(500).send('Error adding record');
    } else {
      console.log('Record added successfully');
      res.send('Record added successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
