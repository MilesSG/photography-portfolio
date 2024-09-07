# 使用官方的 Node.js 镜像作为构建环境
FROM node:16-alpine AS build

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到容器中
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 运行构建命令，生成生产版本
RUN npm run build

# 使用官方的 Nginx 镜像
FROM nginx:latest

# 将自定义的 Nginx 配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将打包后的文件复制到 Nginx 服务的根目录
COPY dist/ /usr/share/nginx/html

# 暴露端口
EXPOSE 80


# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
