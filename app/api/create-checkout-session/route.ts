import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia'
})

export async function POST(req: Request) {
    const { items } = await req.json()

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items,
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        })

        return NextResponse.json({ id: session.id })
    } catch (err) {
        console.error('Stripe Error:', err)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}