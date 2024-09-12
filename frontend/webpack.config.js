module.exports = {
    module: {
        rules: [
            {
                test: /\.geojson$/,
                loader: 'json-loader',
                type: 'javascript/auto'
            },
            // 其他规则
        ]
    },
    // 其他配置
};
