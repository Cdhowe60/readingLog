// app/api/logs/route.ts

import { NextResponse } from 'next/server';
import { addLog, getRecentLogs } from '../../../logService'; // Adjust the path as necessary

export async function POST(request: Request) {
  const { book, pages, date } = await request.json();
  await addLog(book, pages, date);
  return NextResponse.json({ message: 'Log added successfully' });
}

export async function GET() {
  const logs = await getRecentLogs();
  return NextResponse.json(logs);
}
