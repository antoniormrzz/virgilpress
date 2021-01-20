var liveServer = require("live-server");
 
var params = {
    root: "./dist/", // Set root directory that's being served. Defaults to cwd.
    ignore: 'src,node_modules', // comma-separated string for paths to ignore
};
liveServer.start(params);