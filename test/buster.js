var config = module.exports;
config["My tests"] = {
    env: "browser",
    rootPath: "../",
    extensions: [
      require("buster-coffee")
      //, require("buster-amd")
    ],
    sources: [
      "lib/vendor.js",
      "lib/initialize.js",
      "lib/all.js",
      "test/spec_helper.coffee"
    ],
    tests: [
        "test/**/*.test.coffee"
    ]
};
