import { NextResponse } from 'next/server';
import { addLog, getRecentLogs, deleteLog } from '../../../logService';

export async function POST(request: Request) {
  const { book, pages, date } = await request.json();
  await addLog(book, pages, date);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const logs = await getRecentLogs();
  return NextResponse.json(logs);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await deleteLog(id);
  return NextResponse.json({ success: true });
}
