// cai dat thu vien
//npm install express --save
const express = require('express');
// const bodyparser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json()); // Để xử lý JSON
app.use(express.urlencoded({ extended: true })); // Để xử lý URL-encoded dữ liệu

//Setup đường dẫn upfile
// Định nghĩa nơi lưu và tên tệp ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Đặt tên duy nhất cho file
    }
});

const upload = multer({ storage: storage });

////Kết nối db
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'user'
});
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Server');
});

//select (get) lấy danh sách người dùng
app.get('/users', (req, res) => {
    db.query('select * from users', (err, kq) => {
        if (err) throw err;
        res.json(kq);
    });
});


// insert (post)
app.post('/register', upload.single('avatar'), (req, res) => {
    const { username, password } = req.body;
    
    // Kiểm tra avatar, nếu không có thì dùng 'default.png'
    const avatar = req.file ? req.file.filename : 'default.png'; 
    
    // Kiểm tra tài khoản đã tồn tại chưa
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Lỗi server' });
        }
        if (results.length > 0) {
            return res.json({ success: false, message: 'Tài khoản đã tồn tại' });
        }
        // Nếu chưa có tài khoản, thêm mới vào cơ sở dữ liệu
        const insertquery = 'INSERT INTO users (username, password, avatar) VALUES (?, ?, ?)';
        db.query(insertquery, [username, password, avatar], (err, kq) => {
            if (err) throw err;
            res.json({ success: true, message: 'Đã thêm người dùng' });
        });
    });
});


// kiem tra dang nhap
app.post('/login', (req, res) =>{
    const { username, password } = req.body;

    db.query('SELECT * FROM users where username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Lỗi server' });
        }
        if (results.length > 0) {
            res.json({ success: true, message: 'Đăng nhập thành công', user: results[0], role: results[0].role });
        } else {
            res.json({ success: false, message: 'Đăng nhập thất bại' });
        }
    });
});

app.get('/avatar/:username', (req, res) => {
    const username = req.params.username;
    console.log(`Fetching avatar for username: ${username}`);
    var sql = "SELECT avatar FROM users WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length > 0) {
           
            res.json({ avatar: result[0].avatar });
        } else {
            res.status(404).json({ success: false, message: 'Không tìm thấy avatar cho người dùng này' });
        }
    });
});

//Endpoint đổi mật khẩu
app.put('/reset-password', express.json(), (req, res) => {
    
    const { username, password } = req.body;
    //Kiểm tra xem user có tồn tại không
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkQuery, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Lỗi server' });
        }
        if (results.length === 0) {
            return res.json({ success: false, message: 'Không tìm thấy người dùng' });
        }
        //Nếu có thì cập nhật mật khẩu
        const updateQuery = 'UPDATE users SET password = ? WHERE username = ?';
        db.query(updateQuery, [password, username], (err, kq) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Lỗi server' });
            }
            res.json({ success: true, message: 'Đã cập nhật mật khẩu' });
        });
    });

});

// Endpoint best cities
app.get('/bestcities', (req, res) => {
    const query = "Select * from cities";
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });


});
// Endpoint country
app.get('/country', (req, res) => {
    const query = "Select * from country";
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Endpoint country
app.get('/flight', (req, res) => {
    const query = "Select * from flights";
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
// Endpoint airline
app.get('/airline', (req, res) => {
    const query = "Select * from airline";
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


app.post('/createInvoice', (req, res) => {
    const { firstName, lastName, seatClass, tab } = req.body;

    // Kiểm tra xem các tham số có tồn tại không
    if (!firstName || !lastName || !seatClass || !tab) {
        return res.status(400).json({ success: false, message: 'Thiếu thông tin cần thiết' });
    }

    // Tạo câu lệnh SQL để lưu dữ liệu vào bảng hdmaybay
    const sql = 'INSERT INTO hdmaybay (traveller, class, flight) VALUES (?, ?, ?)';

    // Kết nối và thực thi câu lệnh
    db.query(sql, [`${firstName} ${lastName}`, seatClass, tab], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Lỗi khi lưu thông tin hóa đơn' });
        }
        res.json({ success: true, message: 'Đã lưu hóa đơn thành công', invoiceId: result.insertId });
    });
});





app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
