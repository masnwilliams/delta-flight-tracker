import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const airport = searchParams.get('airport') || 'CVG';

  try {
    const response = await fetch(`https://wifi.delta.com/api/portableElectronicDevice/v1/weather/${airport}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

