import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const outputPath = resolve('src/data/friendshipMemes.json');
const sources = [
  { subreddit: 'wholesomememes', count: 4 },
  { subreddit: 'MadeMeSmile', count: 3 },
  { subreddit: 'aww', count: 3 },
  { subreddit: 'Friendshipmemes', count: 3 },
];

const seenUrls = new Set();
const items = [];

async function fetchFromSource(subreddit) {
  const response = await fetch(`https://meme-api.com/gimme/${subreddit}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${subreddit}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function isImageUrl(url) {
  return /\.(png|jpe?g|webp)(\?.*)?$/i.test(url);
}

for (const source of sources) {
  for (let index = 0; index < source.count; index += 1) {
    const meme = await fetchFromSource(source.subreddit);

    if (meme.nsfw || meme.spoiler || !isImageUrl(meme.url) || seenUrls.has(meme.url)) {
      index -= 1;
      continue;
    }

    seenUrls.add(meme.url);
    items.push({
      id: items.length + 1,
      imageUrl: meme.url,
      caption: meme.title,
      source: meme.postLink,
      subreddit: meme.subreddit,
      author: meme.author,
      upvotes: meme.ups,
      previewUrl: meme.preview?.at(-1) ?? null,
    });
  }
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(items, null, 2) + '\n', 'utf8');

console.log(`Wrote ${items.length} memes to ${outputPath}`);
