import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Thank You | Instant Roofing Prices",
  description:
    "Thank you for submitting your roofing quote request. We'll be in touch shortly with your personalized estimate.",
}

export default function ThankYouPage() {
  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>

            <p className="text-lg mb-6">
              Your roofing quote request has been submitted successfully. One of our roofing specialists will contact
              you shortly with your personalized estimate.
            </p>

            <p className="text-gray-600 mb-8">We typically respond within 24 hours during business days.</p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <Home size={20} /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

