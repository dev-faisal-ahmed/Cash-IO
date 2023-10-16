import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    console.log(userData);
  } catch (err) {
    return NextResponse.json({ data: 'Not found' });
  }
}
