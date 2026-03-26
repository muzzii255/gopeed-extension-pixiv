const headers = {
  accept: 'application/json',
  'accept-language': 'en-US,en;q=0.7',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  priority: 'u=1, i',
  'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'sec-gpc': '1',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
};

async function getImageUrls(url) {
  const artID = url
    .split('/')
    .filter((x) => x !== '')
    .pop();

  const resp = await fetch(`https://www.pixiv.net/ajax/illust/${artID}/pages?lang=en`, {
    headers: {
      ...headers,
      referer: `https://www.pixiv.net/en/artworks/${artID}`,
    },
  });

  if (!resp.ok) throw new Error(`Request failed: ${resp.status}`);

  const data = await resp.json();
  const files = [];

  for (const row of data.body) {
    const imgUrl = row.urls.original;
    const filename = imgUrl.split('/').pop();
    files.push({
      name: filename,
      req: {
        url: imgUrl,
        headers: {
          referer: 'https://www.pixiv.net/',
          'user-agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
        },
      },
    });
  }

  return files;
}

export { getImageUrls };
