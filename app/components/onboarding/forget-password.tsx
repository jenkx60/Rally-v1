// 'use client'

// import Link from 'next/link'
// import { useState } from 'react'
// import mail from '@/public/mail.svg'
// import rally from '@/public/Logo.svg'
// import Image from 'next/image'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { ArrowLeft } from 'lucide-react'

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitted, setSubmitted] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       // Simulate sending reset email
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       setSubmitted(true)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (submitted) {
//     return (
//       <div className="space-y-8">
//         <div className="flex flex-col gap-6 justify-center items-center">
//             <Image 
//                 src={mail}
//                 alt="Rally Logo"
//                 width={60}
//                 height={60}
//             />

//             {/* Header */}
//             <div className="space-y-1.5 text-center">
//                 <h1 className="text-[32px] font-bold leading-[120%] text-foreground font-bricolage">Check your email</h1>
//                 <p className="text-[#A3A3A3] font-medium text-sm leading-[150%] font-geist">We sent a password reset link to <span className='text-[#767676]'>{email}</span></p>
//             </div>
//         </div>

//         <div>
//             {/* Footer */}
//             <Button variant="default" className="w-full">
//                 <Link href="/login">Back to login</Link>
//             </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-8">
//         {/* Logo */}
//             <div className="flex flex-col gap-6 justify-center items-center">
//                 <Image 
//                     src={rally}
//                     alt="Rally Logo"
//                     width={40}
//                     height={40}
//                 />

//                 {/* Header */}
//                 <div className="space-y-1.5 text-center">
//                     <h1 className="text-[32px] font-bold leading-[120%] text-foreground font-bricolage">Forgot your password?</h1>
//                     <p className="text-[#A3A3A3] font-medium text-sm leading-[150%] font-geist">No worries, we’ll send you a reset link</p>
//                 </div>
//             </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Email */}
//         <div className="space-y-2">
//           <label className="block text-sm text-[#767676] font-medium font-geist">Email</label>
//           <Input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full px-4 py-3 rounded-lg border border-[#E8E8E8] bg-background text-foreground font-geist placeholder:text-[#BFBFBF] placeholder:font-geist focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Sending...' : 'Send reset link'}
//         </Button>
//       </form>

//       {/* Footer */}
//         <Link href="/login" className="text-[#959595] font-medium hover:underline text-center flex items-center justify-center">
//             <ArrowLeft className="inline-block mr-2 size-4" />
//             <span className='font-semibold'>Back to login</span>
//         </Link>
//     </div>
//   )
// }

'use client'

import Link from 'next/link'
import { useState } from 'react'
import mail from '@/public/mail.svg'
import rally from '@/public/Logo.svg'
import pass from '@/public/pass-change.svg'
import eyeOpen from '@/public/eye-open.svg'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft, Eye, EyeOff, CheckCircle2, EyeClosed } from 'lucide-react'
import { z } from 'zod'

// Schema for the new password step
const resetPasswordSchema = z.object({
    password: z.string().min(8, { message: 'Must be at least 8 characters' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

// Schema for email step
const emailSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
})

type Step = 'request' | 'check-email' | 'reset-form' | 'success'
type ErrorState = { [key: string]: string }

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>('request')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<ErrorState>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear errors on type
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate Email
    const result = emailSchema.safeParse({ email: formData.email })
    if (!result.success) {
        setErrors({ email: result.error.issues[0].message })
        setIsSubmitting(false)
        return
    }

    try {
      // Simulate sending reset email
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep('check-email')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate Passwords
    const result = resetPasswordSchema.safeParse({
        password: formData.password,
        confirmPassword: formData.confirmPassword
    })

    if (!result.success) {
        const newErrors: ErrorState = {}
        result.error.issues.forEach(issue => {
            const field = issue.path[0] as string
            newErrors[field] = issue.message
        })
        setErrors(newErrors)
        setIsSubmitting(false)
        return
    }

    try {
        // Simulate password update
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStep('success')
    } finally {
        setIsSubmitting(false)
    }
  }

  // CHECK EMAIL (Step 2)
  if (step === 'check-email') {
    return (
      <div className="space-y-8 gap-6 md:gap-8 w-full max-w-[400px] mx-auto px-2 md:px-0">
        <div className="flex flex-col gap-6 justify-center items-center">
            <Image 
                src={mail}
                alt="Mail Icon"
                width={60}
                height={60}
            />

            <div className="space-y-1.5 text-center">
                <h1 className="text-[28px] md:text-[32px] font-bold leading-[120%] tracking-[-1px] text-foreground font-bricolage">Check your email</h1>
                <p className="text-[#A3A3A3] font-medium text-[13px] md:text-sm leading-[150%] font-geist">We sent a password reset link to <span className='text-[#767676]'>{formData.email}</span></p>
            </div>
        </div>

        <div className="space-y-4">
            <Button variant="default" className="w-full" onClick={() => setStep('reset-form')}>
                Continue
            </Button>
        </div>
      </div>
    )
  }

  // RESET PASSWORD FORM (Step 3)
  if (step === 'reset-form') {
    return (
        <div className="space-y-8 gap-6 md:gap-8 w-full max-w-[400px] mx-auto px-2 md:px-0">
            <div className="flex flex-col gap-6 justify-center items-center">
                <Image 
                    src={rally}
                    alt="Rally Logo"
                    width={40}
                    height={40}
                />
                <div className="space-y-1.5 text-center">
                    <h1 className="text-[28px] md:text-[32px] font-bold leading-[120%] tracking-[-1px] text-foreground font-bricolage">Change password</h1>
                    <p className="text-[#A3A3A3] font-medium text-[13px] md:text-sm leading-[150%] font-geist">Pick a password you&apos;ll remember</p>
                </div>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
                {/* Password */}
                <div className="space-y-1.5">
                    <label className="block text-sm text-[#767676] font-medium font-geist leading-[150%]">Password</label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border bg-background font-geist placeholder:text-[#BFBFBF] placeholder:font-geist placeholder:font-medium placeholder:text-[15px] text-[15px] text-[#333333] font-medium transition-all
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                                ${errors.password 
                                    ? 'border-[#FF7C7C] focus-visible:ring-[#FF7C7C] text-[#FF7C7C]' 
                                    : 'border-[#E8E8E8] focus-visible:ring-primary'
                                }
                            `}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BFBFBF] hover:text-[#767676] transition-colors focus:outline-none cursor-pointer"
                        >
                            {showPassword ? <EyeClosed className="h-[18px] w-[18px]" /> : <Image src={eyeOpen} alt="Show password" width={18} height={18} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs font-geist font-normal text-[#F04438] mt-1 animate-in slide-in-from-top-1">
                            {errors.password}
                        </p>
                    )}
                    {!errors.password && (
                         <p className='text-xs font-geist font-normal text-muted-foreground'>Must be at least 8 characters</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                    <label className="block text-sm text-[#767676] font-medium font-geist leading-[150%]">Confirm password</label>
                    <div className="relative">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border bg-background font-geist placeholder:text-[#BFBFBF] placeholder:font-geist placeholder:font-medium placeholder:text-[15px] text-[15px] text-[#333333] font-medium transition-all
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                                ${errors.confirmPassword 
                                    ? 'border-[#FF7C7C] focus-visible:ring-[#FF7C7C] text-[#FF7C7C]' 
                                    : 'border-[#E8E8E8] focus-visible:ring-primary'
                                }
                            `}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BFBFBF] hover:text-[#767676] transition-colors focus:outline-none cursor-pointer"
                        >
                            {showConfirmPassword ? <EyeClosed className="h-[18px] w-[18px]" /> : <Image src={eyeOpen} alt="Show password" width={18} height={18} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm font-geist font-normal text-[#F04438] mt-1 animate-in slide-in-from-top-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                    {isSubmitting ? 'Resetting password...' : 'Reset password'}
                </Button>
            </form>

            <button onClick={() => setStep('request')} className="w-full text-[#959595] font-medium hover:underline text-center flex items-center justify-center">
                <ArrowLeft className="inline-block mr-2 size-4 justify-center" />
                <span className='font-semibold text-[15px] font-geist leading-[135%]'>Back to login</span>
            </button>
        </div>
    )
  }

  // SUCCESS (Step 4)
  if (step === 'success') {
    return (
        <div className="space-y-8 gap-6 md:gap-8 w-full max-w-[400px] mx-auto px-5 md:px-0">
            <div className="flex flex-col gap-6 justify-center items-center">
                {/* <div className="h-[60px] w-[60px] rounded-full bg-[#34A853]/10 flex items-center justify-center text-[#34A853]">
                    <CheckCircle2 className="h-8 w-8" />
                </div> */}
                <Image 
                    src={pass}
                    alt="Password Changed Icon"
                    width={60}
                    height={60}
                />

                <div className="space-y-1.5 text-center">
                    <h1 className="text-[28px] md:text-[32px] font-bold leading-[120%] tracking-[-1px] text-foreground font-bricolage">Password changed!</h1>
                    <p className="text-[#A3A3A3] font-medium text-[13px] md:text-sm leading-[150%] font-geist">
                        You&apos;re all set! Log in with your new password
                    </p>
                </div>
            </div>

            <Button variant="default" className="w-full" asChild>
                <Link href="/login">Back to login</Link>
            </Button>
        </div>
    )
  }

  // REQUEST RESET (Step 1 - Existing)
  return (
    <div className="space-y-8 gap-6 md:gap-8 w-full max-w-[400px] mx-auto px-2 md:px-0">
        <div className="flex flex-col gap-6 justify-center items-center">
            <Image 
                src={rally}
                alt="Rally Logo"
                width={40}
                height={40}
            />

            <div className="space-y-1.5 text-center">
                <h1 className="text-[28px] md:text-[32px] font-bold leading-[120%] tracking-[-1px] text-foreground font-bricolage">Forgot password?</h1>
                <p className="text-[#A3A3A3] font-medium text-sm leading-[150%] font-geist">No worries, we’ll send you a reset link</p>
            </div>
        </div>

        <form onSubmit={handleRequestReset} className="space-y-4">
            <div className="space-y-1.5">
                <label className="block text-sm text-[#767676] font-medium font-geist leading-[150%]">Email</label>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg border bg-background font-geist placeholder:text-[#BFBFBF] placeholder:font-geist placeholder:font-medium placeholder:text-[15px] text-[15px] text-[#333333] font-medium transition-all
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                        ${errors.email 
                            ? 'border-[#FF7C7C] focus-visible:ring-[#FF7C7C] text-[#FF7C7C]' 
                            : 'border-[#E8E8E8] focus-visible:ring-primary'
                        }
                    `}
                />
                {errors.email && (
                    <p className="text-sm font-geist font-normal text-[#F04438] mt-1 animate-in slide-in-from-top-1">
                        {errors.email}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send reset link'}
            </Button>
        </form>

        <Link href="/login" className="text-[#959595] font-medium hover:underline text-center flex items-center justify-center">
            <ArrowLeft className="inline-block mr-2 size-4 justify-center" />
            <span className='font-semibold text-[15px] font-geist leading-[135%]'>Back to login</span>
        </Link>
    </div>
  )
}
