import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Admin credentials - in production, use environment variables
const ADMIN_EMAILS = [
  'davidiya3@gmail.com',
  'trombonetimo@gmail.com',
  process.env.ADMIN_EMAIL || 'admin@ninja-ai.com'
];
const ADMIN_PASSWORD = 'admin123';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Debug logging for production
    console.log('Login attempt:', { 
      email, 
      password: password.substring(0, 3) + '***',
      expectedEmails: ADMIN_EMAILS,
      expectedPassword: ADMIN_PASSWORD.substring(0, 3) + '***'
    });

    // Check credentials
    if (!ADMIN_EMAILS.includes(email) || password !== ADMIN_PASSWORD) {
      console.log('Authentication failed:', {
        emailMatch: ADMIN_EMAILS.includes(email),
        passwordMatch: password === ADMIN_PASSWORD
      });
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate session ID
    const sessionId = Math.random().toString(36) + Date.now().toString(36);

    // Try to store session in database, but don't fail if it doesn't work
    try {
      const supabase = createServerClient();
      const { error } = await supabase
        .from('admin_sessions')
        .insert({
          session_id: sessionId,
          email
        });

      if (error) {
        console.error('Session creation error (non-fatal):', error);
        // Continue anyway - session storage is optional for now
      }
    } catch (dbError) {
      console.error('Database connection error (non-fatal):', dbError);
      // Continue anyway - we'll create a temporary session
    }

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
