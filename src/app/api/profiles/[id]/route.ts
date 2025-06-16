import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/config/dbConfig';
import CHA from '@/models/cha.models';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB(); // ensure connection is established

    const user = await CHA.findById(params.id).lean();

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error('[GET_CHAUSER_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
