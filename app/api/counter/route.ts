import { NextResponse } from 'next/server';
import db from '../../lib/database';

export async function GET() {
    try {
        const count = await db.getCount();
        return NextResponse.json({count});
    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: 'Database error'}, {status: 500});
    }
}

export async function POST() {
    try {
        await db.incrementCount();
        const count = await db.getCount;
        return NextResponse.json({count});
    } catch (error) {
        console.error('POST error:', error);
        return NextResponse.json({error: 'Database error'}, {status: 500});
    }
}