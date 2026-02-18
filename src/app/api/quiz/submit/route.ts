import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    console.log('Quiz submission received');
    const body = await request.json();
    console.log('Quiz body parsed:', Object.keys(body));
    const {
      fullName,
      email,
      phone,
      creatorType,
      track,
      archetype,
      archetypeName,
      bottleneck,
      strikeZone,
      focus,
      ignoreList,
      ninetyDayPath,
      answers,
      userAgent,
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !track || !archetype) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: fullName, email, phone, track, archetype' },
        { status: 400 }
      );
    }

    // Save to Supabase
    console.log('Attempting to save to Supabase');
    const supabase = createServerClient();
    
    const insertData = {
      full_name: fullName,
      email,
      phone,
      creator_type: creatorType || 'artist',
      track,
      archetype,
      archetype_name: archetypeName,
      bottleneck,
      strike_zone: strikeZone,
      focus,
      ignore_list: ignoreList,
      ninety_day_path: ninetyDayPath,
      recommended_tier: track || 'explorer', // Add missing field
      answers,
      user_agent: userAgent,
    };
    
    console.log('Insert data prepared:', Object.keys(insertData));
    
    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert(insertData)
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { success: false, error: 'Failed to save submission', details: error.message },
        { status: 500 }
      );
    }
    
    console.log('Successfully saved to Supabase:', data?.id);

    // Send Slack webhook notification
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        const creatorLabel = creatorType ? creatorType.charAt(0).toUpperCase() + creatorType.slice(1) : 'Artist';
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🎯 New Quiz Submission!\nName: ${fullName}\nEmail: ${email}\nCreator Type: ${creatorLabel}\nArchetype: ${archetypeName}\nTrack: ${track}`,
          }),
        });
      } catch (slackError) {
        console.error('Slack notification failed:', slackError);
      }
    }

    // Log to Google Sheets
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            creatorType: creatorType || 'artist',
            track,
            archetypeName,
            bottleneck,
            strikeZone,
          }),
        });
      } catch (sheetsError) {
        console.error('Google Sheets logging failed:', sheetsError);
      }
    }

    // Send results email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Creator Conservatory <quiz@creatorconservatory.com>';

        const focusHtml = Array.isArray(focus)
          ? focus.map((f: string) => `<li style="margin-bottom:6px;">${f}</li>`).join('')
          : '';

        const pathHtml = ninetyDayPath
          ? `<div style="background:#171717;border-radius:8px;padding:20px;margin:24px 0;">
              <h3 style="color:#fff;margin-top:0;">Your 90-Day Path</h3>
              <p style="color:#d4d4d4;">${ninetyDayPath}</p>
            </div>`
          : '';

        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: `Your Creator Quiz Results: ${archetypeName}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0a;color:#e5e5e5;border-radius:12px;">
              <h1 style="color:#fff;font-size:24px;margin-bottom:4px;">Your Creator Quiz Results</h1>
              <p style="color:#a3a3a3;margin-top:0;">Here are your personalized results, ${fullName}.</p>

              <div style="background:#171717;border-radius:8px;padding:20px;margin:24px 0;">
                <h2 style="color:#facc15;font-size:18px;margin-top:0;">Archetype: ${archetypeName}</h2>
                ${strikeZone ? `<p style="margin:8px 0;"><strong style="color:#fff;">Your Path Forward:</strong> ${strikeZone}</p>` : ''}
                ${bottleneck ? `<p style="margin:8px 0;"><strong style="color:#fff;">Bottleneck:</strong> ${bottleneck}</p>` : ''}
              </div>

              ${focusHtml ? `
              <div style="background:#171717;border-radius:8px;padding:20px;margin:24px 0;">
                <h3 style="color:#fff;margin-top:0;">Focus Areas</h3>
                <ul style="padding-left:20px;color:#d4d4d4;">${focusHtml}</ul>
              </div>` : ''}

              ${pathHtml}

              <div style="text-align:center;margin:32px 0;">
                <a href="https://www.skool.com/the-creator-conservatory-3365" style="background:#fff;color:#000;padding:12px 32px;border-radius:24px;text-decoration:none;font-weight:bold;display:inline-block;">Join Creator Conservatory Free</a>
              </div>

              <p style="color:#737373;font-size:12px;margin-top:32px;text-align:center;">&copy; Creator Conservatory. All rights reserved.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Resend email failed:', emailError);
      }
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Quiz submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
