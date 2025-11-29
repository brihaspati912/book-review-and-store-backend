const browserSync = require("browser-sync").create();

browserSync.init({
    proxy: "http://localhost:5000",  // your backend port
    files: ["public/**/*.*", "*.js"], // files to watch
    open: true,                       // auto open browser
    reloadDebounce: 500
});
