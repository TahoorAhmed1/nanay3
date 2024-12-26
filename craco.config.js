const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[hash].[ext]",
                outputPath: "assets/",
              },
            },
          ],
        },
      ],
    },
  },
};
