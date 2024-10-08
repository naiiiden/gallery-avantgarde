import stripe from 'stripe';

import { redirect } from 'next/navigation';

export const metadata = {
    title: "Successful Order | Avantgarde",
    description: "Generated by create next app",
};

export default async function Page({ searchParams }) {
  const sessionId = searchParams.session_id;
  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      redirect('/');
    }

    return (
        <main className="px-4 pb-4 max-w-5xl mx-auto text-center">
            <h1 className="font-bold uppercase text-2xl">Order successful.</h1>
            <p>Thank you for your purchase! Your order was successful.</p>
            <a href="/catalogue">Return to Catalogue</a>
        </main>
    );
  } catch (error) {
    redirect('/');
  }
}