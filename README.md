## 照片分享网站更新指南

此文档帮助你记住如何在照片分享网站中添加新的照片，并确保这些照片能够自动显示在网站上。

### 操作步骤

1. **将新照片添加到相应文件夹中**

    - 把你要添加的照片放入项目的 `public/photos` 目录下的相应文件夹中，例如：
        - `public/photos/chongqing` - 存放重庆的照片
        - `public/photos/new-zealand` - 存放新西兰的照片
        - `public/photos/singapore` - 存放新加坡的照片

   **注意：** 照片格式应为 `.jpg`、`.jpeg`、`.png` 或 `.svg`，以便脚本能够识别和加载这些文件。

2. **运行脚本更新照片列表**

    - 在终端或命令行工具中，运行以下命令生成或更新照片列表 JSON 文件：

   ```bash
   node generatePhotosJson.js
   ```

   该脚本将自动扫描 `public/photos` 目录下的所有文件夹和照片，并生成或更新 `public/photos/photos.json` 文件，包含所有照片的路径。

3. **在本地进行调试**

    - 运行以下命令启动本地开发服务器，确保新添加的照片能正确显示：

   ```bash
   npm run serve
   ```

    - 打开浏览器并访问 `http://localhost:8080`，查看照片是否显示正确。

4. **将更新部署到 GitHub Pages**

    - 确保所有更改已提交到 Git 仓库：

   ```bash
   git add .
   git commit -m "Add new photos and update JSON"
   ```

    - 构建生产环境：

   ```bash
   npm run build
   ```

    - 将打包好的文件推送到 `gh-pages` 分支：

   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

   **注意：** 如果没有设置 `gh-pages` 分支，请参考你的 GitHub Pages 设置来确保正确部署。

### 文件说明

- **`public/photos` 文件夹**：存储所有照片的文件夹，子文件夹按地理位置（如 `chongqing`、`new-zealand` 等）分类。
- **`generatePhotosJson.js`**：Node.js 脚本，用于自动生成或更新 `photos.json` 文件，列出所有照片的路径。
- **`public/photos/photos.json`**：自动生成的 JSON 文件，包含所有照片的路径，用于 Vue 组件动态加载。

### 注意事项

- 每次添加新照片后，都需要运行 `node generatePhotosJson.js` 生成新的 `photos.json` 文件。
- 确保在每次更改后，重新启动本地开发服务器来调试和预览更改。
- 在将更新部署到 GitHub Pages 之前，记得构建项目并将 `dist` 文件夹内容推送到 `gh-pages` 分支。

### 总结

只需添加新照片到正确的文件夹，运行生成 JSON 文件的脚本，然后本地调试和部署更新，便能确保你的网站始终展示最新的内容！

