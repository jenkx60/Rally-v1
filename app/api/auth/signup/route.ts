
import { NextResponse } from 'next/server';
import { db, User } from '@/lib/db';
import { hashPassword, signJWT } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Create user
    const passwordHash = await hashPassword(password);
    const newUser: User = {
      id: uuidv4(),
      email,
      name,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    db.saveUser(newUser);

    // Generate token
    const token = await signJWT({ id: newUser.id, email: newUser.email, name: newUser.name });

    // Set cookie
    const response = NextResponse.json({ 
        user: { id: newUser.id, email: newUser.email, name: newUser.name } 
    });
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
