import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/BlogModel';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();

    const data = await request.json();

    const imageBase64 = data.image;

    // Convert base64 image data to a buffer
    const imageData = Buffer.from(imageBase64, 'base64');

    // Save the blog document with the image data and content type
    const blog = await Blog.create({
      ...data,
      author: 'Osama Shahbaz',
      image: {
        data: imageData,
        contentType: 'image/png', // Update with the appropriate content type
      },
      createdAt: new Date(),
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log(error, 'Registration error');
    return new NextResponse('Internal error', { status: 500 });
  }
}
export async function GET() {
  try {
    await dbConnect();
    const user = await Blog.find();
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
