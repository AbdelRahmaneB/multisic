module.exports = {
    parser: equire('postcss-scss'),
    plugins: [
        require('postcss-sassy-mixins'),
        require('postcss-nested'),
        require('precss'),
        require('autoprefixer'),
    ],
};
