module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      rules: {
        "no-console": 2,
      },
    },
  ],
};
