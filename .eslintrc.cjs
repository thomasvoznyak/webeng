module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: [
        'standard-with-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier'
      ]
    }
  ],
}