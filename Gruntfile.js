var grunt = require("grunt");
var sapim = require("sapim");
require("load-grunt-tasks")(grunt);

grunt.initConfig({
    "browserify": {
        options: {
            browserifyOptions: {
                ignoreMissing: true
            }
        },
        dist: {
            files: {
                "dist/APIProxy/FileResource/index.js": "index.js"
            }
        }
    },
    "clean": {
        dist: ["dist/"]
    },
    "copy": {
        dist: {
            expand: true,
            cwd: "proxy",
            src: "**",
            dest: "dist/APIProxy"
        }
    },
    "babel": {
        options: {
            sourceMap: false,
            presets: ["env"]
        },
        dist: {
            files: {
                "dist/APIProxy/FileResource/index.js": "dist/APIProxy/FileResource/index.js"
            }
        }
    },
    "uglify": {
        dist: {
            files: {
                "dist/APIProxy/FileResource/index.js": "dist/APIProxy/FileResource/index.js"
            }
        }
    },
    "package": {
        dist: {
            src: "dist/APIProxy",
            dest: "dist/proxy.zip",
            placeholders: {
                "service-name": "sapim-sample",
                "service-description": "Sample API Proxy for using the SAPIM tool",
                "service-base-path": "/sample"
            }
        }
    },
    "upload": {
        dist: {
            src: "dist/proxy.zip",
        }
    }
});

grunt.registerMultiTask("package", "Package the proxy", function() {
    sapim.default()
        .packageProxyToFile(this.data.src, this.data.dest, !!this.data.placeholders, this.data.placeholders)
        .then(this.async());
});

grunt.registerMultiTask("upload", "Upload the proxy", function() {
    sapim.default().uploadProxy(this.data.src).then(this.async());
});

grunt.registerTask("default", ["clean", "copy", "browserify", "babel", "uglify", "package"]);
grunt.registerTask("deploy", ["default", "upload"]);