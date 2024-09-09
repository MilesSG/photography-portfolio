const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // 引入 sharp 库

// 定义照片目录
const photoDir = path.join(__dirname, 'public', 'photos');
const outputJson = path.join(photoDir, 'photos.json');

// 定义调整后的尺寸
const TARGET_WIDTH = 400; // 目标宽度
const TARGET_HEIGHT = 300; // 目标高度

// 递归扫描目录中的所有文件
function getPhotos(folderPath) {
    const files = fs.readdirSync(folderPath);
    return files.filter(file => /\.(jpg|jpeg|png|svg)$/i.test(file));
}

// 调整图片尺寸
function resizeImage(inputPath, outputPath) {
    return sharp(inputPath)
        .rotate() // 自动旋转以保持正确的方向
        .resize(TARGET_WIDTH, TARGET_HEIGHT, {
            fit: 'cover', // 填充模式
            position: 'center' // 居中裁剪
        })
        .toFile(outputPath)
        .then(() => console.log(`Resized image saved: ${outputPath}`))
        .catch(err => console.error(`Error resizing image: ${inputPath}`, err));
}


// 构建 JSON 数据
function generatePhotosJson() {
    const photoFolders = fs.readdirSync(photoDir);
    const photoData = {};

    photoFolders.forEach(folder => {
        const folderPath = path.join(photoDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            const photos = getPhotos(folderPath);

            // 创建缩略图目录
            const thumbnailDir = path.join(folderPath, 'thumbnails');
            if (!fs.existsSync(thumbnailDir)) {
                fs.mkdirSync(thumbnailDir);
            }

            photoData[folder] = photos.map(photo => {
                const originalPath = path.join(folderPath, photo);
                const thumbnailPath = path.join(thumbnailDir, photo);

                // 调整尺寸并保存到缩略图目录
                resizeImage(originalPath, thumbnailPath);

                return {
                    original: path.join('photos', folder, photo).replace(/\\/g, '/'), // 替换路径中的反斜杠为正斜杠
                    thumbnail: path.join('photos', folder, 'thumbnails', photo).replace(/\\/g, '/') // 替换路径中的反斜杠为正斜杠
                };
            });
        }
    });

    fs.writeFileSync(outputJson, JSON.stringify(photoData, null, 2));
    console.log('照片 JSON 文件已生成:', outputJson);
}

generatePhotosJson();
