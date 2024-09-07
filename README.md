
## 运行项目

### 运行前端

1. 进入前端项目目录：

    ```bash
    cd frontend
    ```

2. 安装依赖项：

    ```bash
    npm install
    ```

3. 启动开发服务器：

    ```bash
    npm run serve
    ```

4. 在浏览器中访问 `http://localhost:8080`，查看前端项目是否成功运行。

### 运行后端

1. 进入后端项目目录：

    ```bash
    cd backend
    ```

2. 安装依赖项：

    ```bash
    npm install
    ```

3. 启动后端服务器：

    ```bash
    node server.js
    ```

4. 后端服务器将运行在 `http://localhost:3000`，可以在终端查看是否启动成功。

## 添加新照片

1. 将新照片添加到相应的相册文件夹中：

   - 如果你想添加照片到某个相册，请将照片放置在 `frontend/public/photos` 目录下的相应文件夹中。例如：
      - `public/photos/chongqing` - 存放重庆的照片
      - `public/photos/new-zealand` - 存放新西兰的照片
      - `public/photos/singapore` - 存放新加坡的照片

   确保照片格式为 `.jpg`、`.jpeg`、`.png` 或 `.svg`，以便系统能够识别和加载这些文件。

2. 更新照片列表 JSON 文件：

   进入前端项目目录并运行以下命令来生成或更新照片列表 JSON 文件：

    ```bash
    cd frontend
    node generatePhotosJson.js
    ```

   该脚本会自动扫描 `public/photos` 目录下的所有文件夹和照片，并生成或更新 `public/photos/photos.json` 文件，包含所有照片的路径。

3. 在本地进行调试：

   运行以下命令启动本地开发服务器，确保新添加的照片能正确显示：

    ```bash
    npm run serve
    ```

   打开浏览器并访问 `http://localhost:8080`，查看照片是否显示正确。

## 将更改部署到 GitHub Pages

1. 确保所有更改已提交到 Git 仓库：

    ```bash
    git add .
    git commit -m "Add new photos and update JSON"
    ```

2. 构建生产环境文件：

    ```bash
    npm run build
    ```

3. 将构建好的文件推送到 `gh-pages` 分支：

    ```bash
    git subtree push --prefix frontend/dist origin gh-pages
    ```

   > 注意：如果没有设置 `gh-pages` 分支，请参考你的 GitHub Pages 设置来确保正确配置。

## 注意事项

- 确保你在对项目进行更改前，先拉取最新的代码，防止冲突。
- 照片文件名不要包含特殊字符或空格，避免加载问题。
