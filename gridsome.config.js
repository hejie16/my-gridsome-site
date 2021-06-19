// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: '我的博客',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'README.md',
        typeName: 'DocPage'
      }
    }
  ],
  templates: {
    Followings: '/social/:id',
  }
}
