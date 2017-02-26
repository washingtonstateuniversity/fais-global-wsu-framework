module.exports = {
    default : {
        options: {
            inlineSources: true,
            inlineSourceMap: true
        },
        src: [
            "./src/scripts/polyfills/**/*.ts", // do core items first
            "./src/scripts/core/**/*.ts", // do core items first
            "./src/scripts/**/*.ts",
            "!node_modules/**"
            ],
        out: './dist/js/mainline.js', // switch to inline and combin after
      }
};
