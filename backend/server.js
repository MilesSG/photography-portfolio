const express = require('express'); // 引入 Express
const cors = require('cors'); // 引入 CORS 中间件
const bodyParser = require('body-parser'); // 引入 body-parser 中间件
const mysql = require('mysql2'); // 使用 mysql2 以支持 MySQL 8.0 的身份验证协议
const multer = require('multer'); // 用于处理文件上传

const app = express(); // 创建 Express 应用实例
const port = 3000; // 设置后端运行的端口

app.use(cors()); // 启用 CORS
app.use(bodyParser.json()); // 解析 JSON 格式的请求体

// 创建 MySQL 数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // 替换为你的MySQL用户名
    password: '888999', // 替换为你的MySQL密码
    database: 'photo_gallery' // 替换为你创建的数据库名称
});

// 连接到 MySQL 数据库
db.connect((err) => {
    if (err) {
        console.error('无法连接到数据库:', err);
        return;
    }
    console.log('已连接到MySQL数据库！');
});

// 使用 Multer 处理文件上传
const storage = multer.memoryStorage(); // 使用内存存储文件
const upload = multer({ storage: storage }); // 配置上传中间件

// 处理照片上传的 API 端点
app.post('/api/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        console.error('文件未上传');
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { location, date, description } = req.body;
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : null; // 检查日期是否为空
    const imageData = req.file.buffer;

    console.log('接收到上传请求:');
    console.log('位置:', location || '空');
    console.log('日期:', formattedDate || '空');
    console.log('描述:', description || '空');
    console.log('文件信息:', req.file);

    // 将照片信息和数据插入数据库
    const sql = 'INSERT INTO photos (location, date, description, image_data) VALUES (?, ?, ?, ?)';
    db.query(sql, [location || null, formattedDate, description || null, imageData], (err, result) => {
        if (err) {
            console.error('无法将照片信息插入数据库:', err);
            return res.status(500).json({ error: '数据库错误', details: err });
        }
        console.log('照片已成功插入数据库，ID:', result.insertId);
        res.json({ message: '照片已上传并保存到数据库！', id: result.insertId });
    });
});

// 获取所有照片的 API 端点
app.get('/api/getPhotos', (req, res) => {
    const sql = 'SELECT id, location, date, description, image_data FROM photos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('无法获取照片:', err);
            return res.status(500).json({ error: '无法获取照片' });
        }
        // 转换为 base64 格式
        const photos = results.map(photo => ({
            id: photo.id,
            location: photo.location,
            date: photo.date,
            description: photo.description,
            imageData: photo.image_data ? `data:image/jpeg;base64,${photo.image_data.toString('base64')}` : null
        }));
        res.json(photos);
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
