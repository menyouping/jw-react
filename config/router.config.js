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
            { path: 'json', component: './beautify/json' },
            { path: 'xml', component: './beautify/xml' },
            { path: 'sql', component: './beautify/sql' },
          ]
        },
        {
          path: 'calc',
          routes: [
            { path: 'set', component: './calc/set' },
            { path: 'template', component: './calc/template' },
            { path: 'compare', component: './calc/compare' }
          ]
        },
        { path: 'cards', component: './cards' },
        { path: 'locale', component: './locale' }
      ]
    }
  ];