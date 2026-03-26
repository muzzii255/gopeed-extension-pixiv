import * as parser from './parser/parse.js';

gopeed.events.onResolve(async (ctx) => {
  const url = ctx.req.url;

  const artId = url
    .split('/')
    .filter((x) => x !== '')
    .pop();

  if (!artId) {
    throw new Error('Invalid Pixiv URL. Could not extract artwork ID.');
  }

  const files = await parser.getImageUrls(url);

  if (files.length === 0) {
    throw new Error('No downloadable media found in this artwork.');
  }

  ctx.res = {
    name: `pixiv_${artId}`,
    files: files,
  };
});
