import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia'
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function POST(req: Request) {
    const { items } = await req.json()

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items,
            success_url: `${baseUrl}/success`,
            cancel_url: `${baseUrl}/cancel`,
        })

        return NextResponse.json({ id: session.id })
    } catch (err) {
        console.error('Stripe Error:', err)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}