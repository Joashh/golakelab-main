// app/api/community/create-post/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Please login to create a post' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, content } = body;

        if (!title?.trim() || !content?.trim()) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // ✅ Call WordPress with subscriber permissions
        const wpResponse = await fetch(
            `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/custom/v1/create-post`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.WP_API_SECRET!,
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    email: session.user.email,
                    wordpress_id: session.user.wordpressId,
                }),
            }
        );

        const data = await wpResponse.json();

        if (!wpResponse.ok) {
            console.error('WordPress error:', data);
            return NextResponse.json(
                { error: data.message || 'Failed to create post' },
                { status: wpResponse.status }
            );
        }

        // ✅ Return success with status message
        return NextResponse.json({
            success: true,
            message: data.message,
            status: data.status,
            post: {
                id: data.id,
                title: data.title,
                author: data.author
            }
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}