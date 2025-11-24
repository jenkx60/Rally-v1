'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import Image from 'next/image'
import rally from '@/public/Logo.svg'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { Eye, EyeClosed } from 'lucide-react'
import eyeOpen from '@/public/eye-open.svg'

type LoginFormData = {
    email: string
    password: string
}

type LoginErrorState = { [key: string]: string }

const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' })
    .nonempty({ message: 'Email is required' }),
    password: z.string().min(8, { message: 'Password is required' }), 
})

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrorState>({})
  const { setError: setAuthError, setUser } = useAuthStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = loginSchema.safeParse(formData)

    if (!result.success) {
        const newErrors: LoginErrorState = {}
        result.error.issues.forEach((issue) => {
            const fieldName = issue.path[0] as string
            newErrors[fieldName] = issue.message
        })
        
        setErrors(newErrors)
        setIsSubmitting(false)
        return
    }

    // Clears errors if validation passes
    setErrors({})

    try {
      // Simulate login
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        id: '1',
        email: formData.email,
        name: 'User',
      })
    } catch (err) {
      // for API errors
      setErrors({ form: 'Invalid email or password' })
      setAuthError('Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex flex-col gap-6 md:gap-8 w-full max-w-[400px] mx-auto px-5 md:px-0'>
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
                <div className="space-y-1 text-center">
                    <h1 className="text-[28px] md:text-[32px] font-bold leading-[120%] tracking-[-1px] text-foreground font-bricolage">Welcome back</h1>
                    <p className="text-[#A3A3A3] font-medium text-[13px] md:text-sm leading-[150%] font-geist">Pick up where you left off</p>
                </div>
            </div>

            {/* Google Button */}
            <button
                type="button"
                className="w-full py-3 px-4 rounded-lg border border-[#E8E8E8] bg-background hover:bg-[#fdfdfd] transition-colors flex items-center justify-center gap-3 text-[#767676] text-[15px] font-semibold font-geist cursor-pointer"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
            </button>

            <div className='space-y-6'>
                {/* Divider */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#E8E8E8]" />
                    <span className="text-xs text-muted-foreground font-geist">OR</span>
                    <div className="flex-1 h-px bg-[#E8E8E8]" />
                </div>

                {/* General API Error */}
                {errors.form && (
                    <div className="p-3 rounded-lg bg-[#FF7C7C]/10 text-[#FF7C7C] text-sm">
                        {errors.form}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="block text-sm text-[#767676] font-medium font-geist leading-[150%]">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={`w-full px-3.5 py-2.5 rounded-lg border bg-background font-geist placeholder:text-[#BFBFBF] placeholder:font-geist transition-all
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

                    {/* Password */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm text-[#767676] font-medium font-geist leading-[150%]">Password</label>
                        </div>
                        <div className='relative'>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full px-3.5 py-2.5 rounded-lg border bg-background font-geist placeholder:text-[#BFBFBF] placeholder:font-geist transition-all
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] transition-colors focus:outline-none cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeClosed className="h-[18px] w-[18px]" />
                                ) : (
                                    <Image src={eyeOpen} alt="Show password" width={18} height={18} />
                                )}
                            </button>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                {errors.password && (
                                    <p className="text-sm font-geist font-normal text-[#F04438] mt-1 animate-in slide-in-from-top-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Link
                                    href="/forgot-password"
                                    className="text-[14px] text-primary hover:underline mt-1 font-geist font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
                    >
                        {isSubmitting ? 'Logging in...' : 'Continue'}
                    </Button>
                </form>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground font-geist font-normal">
                New to Rally?{' '}
                <Link href="/signup" className="text-primary font-medium hover:underline text-[14px]">
                    Sign up
                </Link>
            </p>
        </div>
    </div>
  )
}

export default LoginForm
