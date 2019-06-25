'use strict';
exports.__esModule = true;
var path = require('path');
var sm = require('sitemap');
var fs = require('fs');
var dsteem_1 = require('dsteem');
var OUTPUT_FILE = path.resolve(__dirname, '..', '..', 'public', 'sitemap.xml');
var steemClient = new dsteem_1.Client('https://api.steemit.com');
var dbAPI = new dsteem_1.DatabaseAPI(steemClient);
var hostname = 'https://pjtaggart.com';
dbAPI
  .getDiscussions('blog', {
    tag: 'petertag',
    limit: 100
  })
  .then(function(posts) {
    var noActifitPosts = posts.filter(function(post) {
      return post.category !== 'actifit' && post.author === 'petertag';
    });

    var sitemap = sm.createSitemap({
      hostname: hostname,
      cacheTime: 600000,
      urls: [
        { url: '/', changefreq: 'weekly', priority: 1 },
        { url: '/feed', changefreq: 'weekly', priority: 0.5 },
        { url: '/about', changefreq: 'weekly', priority: 0.5 },
        { url: '/portfolio', changefreq: 'monthly', priority: 0.5 },
        { url: '/profile', changefreq: 'weekly', priority: 0.5 },
        { url: '/witnesses', changefreq: 'weekly', priority: 0.5 },
        { url: '/witness-schedule', changefreq: 'weekly', priority: 0.5 }
      ].concat(
        noActifitPosts.map(function(post) {
          return {
            url: hostname + '/post/' + post.permlink,
            changefreq: 'monthly',
            priority: 0.3
          };
        })
      )
    });
    fs.writeFileSync(OUTPUT_FILE, sitemap.toString());
    console.log('Sitemap written at ' + OUTPUT_FILE);
  })
  ['catch'](function(error) {
    return console.log(error);
  });
