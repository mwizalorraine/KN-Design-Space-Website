// Save as: app/api/youtube/route.ts
import { NextResponse } from 'next/server';

const CHANNEL_ID = 'UCgzVwSZ9fStPieSspZ-194Q'; // @KNDesignSpace
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decode(s: string) {
  return s 
    .replace(/&amp;/g, '&') 
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function GET() {
  try {
    // Runs on the server, so there's no CORS problem, and no API key is needed.
    // The result is cached for an hour so YouTube isn't hit on every page visit.
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
    const xml = await res.text();

    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
    const videos = entries
      .map((entry) => ({
        id: entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '',
        title: decode(entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? ''),
      }))
      .filter((v) => v.id);

    return NextResponse.json(videos);
  } catch {
    return NextResponse.json([], { status: 502 });
  }
}