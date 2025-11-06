import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('📝 Received registration data:', body);
    
    const {
      name,
      talkTitle,
      description,
      expectations,
      eventId,
      eventTitle,
      eventDate,
      submittedAt,
    } = body;

    // Validate required fields
    if (!name || !talkTitle || !description) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Google Sheets credentials from environment variables
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;

    console.log('🔗 Script URL:', scriptUrl ? 'Configured' : 'NOT CONFIGURED');

    if (!scriptUrl) {
      console.error('❌ Google Sheets Script URL not configured');
      return NextResponse.json(
        { error: 'Configuration error: Google Sheets URL not set' },
        { status: 500 }
      );
    }

    const payload = {
      name,
      talkTitle,
      description,
      expectations: expectations || 'N/A',
      eventId,
      eventTitle,
      eventDate,
      submittedAt,
    };

    console.log('📤 Sending to Google Sheets:', payload);

    // Send data to Google Sheets via Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    console.log('📥 Google Sheets response status:', response.status);

    const responseText = await response.text();
    console.log('📥 Google Sheets response body:', responseText);

    if (!response.ok) {
      throw new Error(`Google Sheets returned status ${response.status}: ${responseText}`);
    }

    console.log('✅ Registration saved successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error processing registration:', error);
    return NextResponse.json(
      { error: `Failed to process registration: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
