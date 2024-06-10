const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;

app.use(cors()); // Sử dụng cors
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const newUser = req.body;

  fs.readFile('users.json', (err, data) => {
    let usersData = [];
    if (!err) {
      usersData = JSON.parse(data);
    }

    // Kiểm tra tên đăng nhập đã tồn tại chưa
    const existingUser = usersData.find(user => user.username === newUser.username);
    if (existingUser) {
      return res.status(400).send('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
    }
    const existingEmail = usersData.find(user => user.email === newUser.email);
    if (existingEmail) {
      return res.status(400).send('Email đã tồn tại');
    }

    // Thêm người dùng mới và lưu lại vào file
    usersData.push(newUser);

    fs.writeFile('users.json', JSON.stringify(usersData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      res.status(200).send('Đăng ký thành công!');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
