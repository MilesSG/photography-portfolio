const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; // 后端运行在 http://localhost:3000

app.use(cors());
app.use(bodyParser.json()); // 解析 JSON 格式的请求体

// 使用评论路由模块
const commentsRouter = require('./routes/comments');
app.use('/api/comments', commentsRouter);


// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
