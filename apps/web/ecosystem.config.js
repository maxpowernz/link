module.exports = {
    apps: [
      {
        name: "linkaarong",
        script: "./node_modules/next/dist/bin/next",
        args: "start -p " + (process.env.PORT || 3000),
        watch: false,
        autorestart: true,
      },
    ],
  };