import path = require('path');
import sm = require('sitemap');
import fs = require('fs');
import { Client, DatabaseAPI } from 'dsteem';

const OUTPUT_FILE = path.resolve(
  __dirname,
  '..',
  '..',
  'public',
  'sitemap.xml'
);
const steemClient = new Client('https://api.steemit.com');
const dbAPI = new DatabaseAPI(steemClient);
const hostname = 'https://pjtaggart.com';

dbAPI
  .getDiscussions('blog', {
    tag: 'petertag',
    limit: 100
  })
  .then(posts => {
    const noActifitPosts = posts.filter(
      post => post.category !== 'actifit' && post.author === 'petertag'
    );
    noActifitPosts.map(post => ({
      url: hostname + '/post/' + post.permlink,
      changefreq: 'monthly',
      priority: 0.3
    }));

    const sitemap = sm.createSitemap({
      hostname,
      cacheTime: 600000, //600 sec (10 min) cache purge period
      urls: [
        { url: '/', changefreq: 'weekly', priority: 1 },
        { url: '/feed', changefreq: 'weekly', priority: 0.5 },
        { url: '/about', changefreq: 'weekly', priority: 0.5 },
        { url: '/portfolio', changefreq: 'monthly', priority: 0.5 },
        ...noActifitPosts.map(post => ({
          url: hostname + '/post/' + post.permlink,
          changefreq: 'monthly',
          priority: 0.3
        }))
      ]
    });

    fs.writeFileSync(OUTPUT_FILE, sitemap.toString());

    console.log(`Sitemap written at ${OUTPUT_FILE}`);
  })
  .catch(error => console.log(error));
