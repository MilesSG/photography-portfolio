const fs = require('fs');
const path = require('path');

// 定义照片目录
const photoDir = path.join(__dirname, 'public', 'photos');
const outputJson = path.join(photoDir, 'photos.json');

// 递归扫描目录中的所有文件
function getPhotos(folderPath) {
    const files = fs.readdirSync(folderPath);
    return files.filter(file => /\.(jpg|jpeg|png|svg)$/i.test(file));
}

// 构建 JSON 数据
function generatePhotosJson() {
    const photoFolders = fs.readdirSync(photoDir);
    const photoData = {};

    photoFolders.forEach(folder => {
        const folderPath = path.join(photoDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            photoData[folder] = getPhotos(folderPath);
        }
    });

    fs.writeFileSync(outputJson, JSON.stringify(photoData, null, 2));
    console.log('照片 JSON 文件已生成:', outputJson);
}

generatePhotosJson();
