module.exports = {
    apps: [
      {
        name: "linkaaron2",
        script: "./node_modules/next/dist/bin/next",
        args: "start",
        watch: false,
        autorestart: true,
      },
    ],
  };