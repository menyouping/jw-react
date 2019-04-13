export default [
    {
      path: '/',
      component: '../layout',
      routes: [
        {
          path: '/',
          component: './index'
        },
        {
          path: 'beautify',
          routes: [
            { path: 'json', component: './beautify/json' }
          ]
        },
        { path: 'cards', component: './cards' },
        { path: 'locale', component: './locale' }
      ]
    }
  ];