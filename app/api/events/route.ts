
import { NextResponse } from 'next/server';
import { db, Event } from '@/lib/db';
import { verifyJWT } from '@/lib/auth';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    if (!payload || !payload.id) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = payload.id as string;
    const events = db.getEvents(userId);

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    if (!payload || !payload.id) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = payload.id as string;
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.startTime || !body.endTime) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newEvent: Event = {
      ...body,
      id: uuidv4(),
      userId,
      createdAt: new Date().toISOString(),
      attendees: 0, 
      status: 'Upcoming', // Default status
    };

    db.saveEvent(newEvent);

    return NextResponse.json({ event: newEvent });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
