'use client'

import Link from 'next/link'
import { useState } from 'react'
import mail from '@/public/mail.svg'
import rally from '@/public/Logo.svg'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate sending reset email
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-6 justify-center items-center">
            <Image 
                src={mail}
                alt="Rally Logo"
                width={60}
                height={60}
            />

            {/* Header */}
            <div className="space-y-1.5 text-center">
                <h1 className="text-[32px] font-bold leading-[120%] text-foreground font-bricolage">Check your email</h1>
                <p className="text-[#A3A3A3] font-medium text-sm leading-[150%] font-geist">We sent a password reset link to <span className='font-bold text-[#767676]'>{email}</span></p>
            </div>
        </div>

        <div>
            {/* Footer */}
            <Button variant="default" className="w-full">
                <Link href="/login">Back to login</Link>
            </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
        {/* Logo */}
            <div className="flex flex-col gap-6 justify-center items-center">
                <Image 
                    src={rally}
                    alt="Rally Logo"
                    width={40}
                    height={40}
                />

                {/* Header */}
                <div className="space-y-1.5 text-center">
                    <h1 className="text-[32px] font-bold leading-[120%] text-foreground font-bricolage">Forgot your password?</h1>
                    <p className="text-[#A3A3A3] font-medium text-sm leading-[150%] font-geist">No worries, we’ll send you a reset link</p>
                </div>
            </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm text-[#767676] font-medium font-geist">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-[#E8E8E8] bg-background text-foreground font-geist placeholder:text-[#BFBFBF] placeholder:font-geist focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send reset link'}
        </Button>
      </form>

      {/* Footer */}
        <Link href="/login" className="text-[#959595] font-medium hover:underline text-center flex items-center justify-center">
            <ArrowLeft className="inline-block mr-2 size-4" />
            <span>Back to login</span>
            
        </Link>
    </div>
  )
}
