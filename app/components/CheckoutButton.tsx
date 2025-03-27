'use client'

import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutButton() {
    const handleClick = async () => {
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: { name: 'My Product'},
                            unit_amount: 2000,
                        },
                        quantity: 1,
                    },
                ],
            }),
        })

    const { id } = await res.json()
    const stripe = await stripePromise

    stripe?.redirectToCheckout({ sessionId: id })

    }

    return <button className='bg-blue-500 border-2 rounded-lg p-4 border-solid cursor-pointer' onClick={handleClick}>BUY NOW</button>
}