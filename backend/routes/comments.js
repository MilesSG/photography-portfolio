const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// 创建 MySQL 连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // 替换为你的 MySQL 用户名
    password: '888999', // 替换为你的 MySQL 密码
    database: 'photography_website' // 你的数据库名称
});

// 创建评论表
const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS comments
    (
        id
        INT
        AUTO_INCREMENT
        PRIMARY
        KEY,
        name
        VARCHAR
    (
        255
    ) NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
`;

db.query(createCommentsTable, (err, result) => {
    if (err) {
        console.error('Error creating comments table:', err);
    } else {
        console.log('Comments table created or already exists.');
    }
});


// 获取所有评论的 API 路由
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM comments ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch comments' });
        } else {
            res.json(results);
        }
    });
});

// 保存评论的 API 路由
router.post('/', (req, res) => {
    const { name, comment } = req.body;
    const sql = 'INSERT INTO comments (name, comment) VALUES (?, ?)';
    db.query(sql, [name, comment], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to save comment' });
        } else {
            res.json({ id: result.insertId, name, comment });
        }
    });
});

module.exports = router;

