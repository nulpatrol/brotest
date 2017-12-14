let mix = require('laravel-mix');

mix.setPublicPath('public/');
mix.js('assets/js/app.js', 'public/js')
   .sass('assets/scss/app.scss', 'public/css');
