// 'use client'

// import Link from 'next/link'
// import { useState } from 'react'
// import { useAuthStore } from '@/lib/auth-store'
// import { title } from 'process'
// import rally from '@/public/Logo.svg'
// import Image from 'next/image'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { email, z } from 'zod'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '../ui/form'
// import { useForm } from 'react-hook-form'

// type FormData = {
//     name: string
//     email: string
//     password: string
//     confirmPassword: string
// }

// type ErrorState = string | { [key: string]: string }

// type stepField = {
//     name: keyof FormData
//     label: string
//     type: string
//     placeholder: string
// }

// type Step = {
//     title: string
//     description: string
//     fields: stepField[]
// }

// const stepSchemas = [
//     z.object({
//         email: z.string().email({ message: 'Please enter a valid email address' }),
//     }),
//     z.object({
//         password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
//         confirmPassword: z.string(),
//     }).refine((data) => data.password === data.confirmPassword, {
//         message: 'Passwords do not match',
//         path: ['confirmPassword'],
//     }),
//     z.object({
//         name: z.string().min(2, { message: 'Name is required' }),
//     }),
// ]

// const steps: Step[] = [
//     {
//         title: 'Welcome to Rally',
//         description: 'Turn group chats into real plans',
//         fields: [
//             {
//                 name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email'
//             },
//         ],
//     },
//     {
//         title: 'Create your password',
//         description: 'Pick somthing strong',
//         fields: [
//             { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
//             { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
//         ],
//     },
//     {
//         title: 'What should we call you?',
//         description: 'Enter your full name',
//         fields: [
//             { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
//         ],
//     },
// ]

// const errorColors = {
//     ring: 'focus:ring-[#FF7C7C]',
//     border: 'border-[#FF7C7C]',
//     text: 'text-[#FF7C7C]',
// }

// const SignUp = () => {
//   const [step, setStep] = useState<number>(0);
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   })
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
//   const [error, setError] = useState<ErrorState>('')
//   const { setError: setAuthError, setUser } = useAuthStore()

//   const form = useForm<FormData>({
//     defaultValues: {
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     },
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     setError('')
//   }

//   const handleNext = (e: React.FormEvent) => {
//     e.preventDefault()
//     const errors: {[key: string]: string} = {}

//     const currentFields: Partial<FormData> = {}
//     steps[step].fields.forEach(f => {
//         const key = f.name as keyof FormData
//         currentFields[key] = formData[key]
//     })

//     const result = stepSchemas[step].safeParse(currentFields)
//     if (!result.success) {
//         const firstIssue = result.error.issues[0]
//         const field = firstIssue.path[0] as string
//         if (field === 'email') {
//             setError(firstIssue.message)
//         } else if (field === 'password' || field === 'confirmPassword') {
//             setError(firstIssue.message)
//         } else if (field === 'name') {
//             setError(firstIssue.message)
//         }
//         return
//     }
//     setError('')
//     if (step < steps.length - 1) {
//         setStep(step + 1)
//     } else {
//         handleSubmit()
//     }
//   }
//   const handleSubmit = async () => {
//     setIsSubmitting(true)
//     try {
//       // Simulate sign up
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       setUser({
//         id: '1',
//         email: formData.email,
//         name: formData.name,
//       })
//     } catch (err) {
//       setError('Failed to create account. Please try again.')
//       setAuthError('Failed to create account')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const { title, description, fields } = steps[step]

//   return (
//     <div className='flex flex-col gap-8'>
//         <div className="space-y-8">
//             {/* Logo */}
//             <div className="flex flex-col gap-6 justify-center items-center">
//                 <Image 
//                     src={rally}
//                     alt="Rally Logo"
//                     width={40}
//                     height={40}
//                 />

//                 {/* Header */}
//                 <div className="space-y-1.5 text-center">
//                     <h1 className="text-[32px] font-bold leading-[120%] text-foreground font-bricolage">{title}</h1>
//                     <p className="text-[#A3A3A3] font-medium text-sm leading-[150%] font-geist">{description}</p>
//                 </div>
//             </div>

//                 {/* Google Button */}
//                 {step === 0 && (
//                     <>
//                         <button
//                             type="button"
//                             className="w-full py-3 px-4 rounded-lg border border-[#E8E8E8] bg-background transition-colors flex items-center justify-center gap-3 text-[#767676] font-semibold font-geist cursor-pointer"
//                         >
//                             <svg
//                             className="w-5 h-5"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                             >
//                             <path
//                                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                                 fill="#4285F4"
//                             />
//                             <path
//                                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                                 fill="#34A853"
//                             />
//                             <path
//                                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                                 fill="#FBBC05"
//                             />
//                             <path
//                                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                                 fill="#EA4335"
//                             />
//                             </svg>
//                             Continue with Google
//                         </button>
//                         {/* Divider */}
//                         <div className="flex items-center gap-4">
//                             <div className="flex-1 h-px bg-border" />
//                             <span className="text-sm text-muted-foreground font-geist">OR</span>
//                             <div className="flex-1 h-px bg-border" />
//                         </div>
//                     </>
//                 )}

//             <div className='space-y-6'>
//                 {/* Error Message */}
//                 {typeof error === 'string' && error && (
//                     <div className="p-3 rounded-lg bg-[#FF7C7C]/10 text-[#FF7C7C] text-sm">
//                         {error}
//                     </div>
//                 )}

//                 {/* Form */}
//                 <form onSubmit={handleNext} className="space-y-4">
//                     {fields.map((field) => (
//                         <div key={field.name} className="space-y-2">
//                             <label className="block text-sm text-[#767676] font-medium font-geist">{field.label}</label>
//                             <Input
//                                 type={field.type}
//                                 name={field.name}
//                                 value={formData[field.name as keyof typeof formData]}
//                                 onChange={handleChange}
//                                 placeholder={field.placeholder}
//                                 className={`w-full px-4 py-3 rounded-lg border border-[#E8E8E8] bg-background text-foreground font-geist placeholder:text-[#BFBFBF] placeholder:font-geist focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
//                                     typeof error !== 'string' && error[field.name] 
//                                         ? 'border-[#FF7C7C] focus:ring-[#FF7C7C]'
//                                         : 'border-[#E8E8E8] focus:ring-primary'
//                                 }`}
//                                 required
//                             />
//                             {/* Error Message */}
//                             {typeof error !== 'string' && error[field.name] && (
//                                 <p className="text-sm font-geist font-normal text-[#FF7C7C] mt-1">{error[field.name]}</p>
//                             )}
//                             {field.name === 'password' && step === 1 && (
//                                 <p className='text-xs font-geist font-normal text-muted-foreground'>Must be at least 8 characters</p>
//                             )} 
//                         </div>
//                     ))}

//                     {/* Next/Submit Button */}
//                     <Button
//                         type="submit"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? 'Creating account...' : step < steps.length - 1 ? 'Continue' : "Let's Rally!"}
//                     </Button>
//                 </form>
//             </div>


//             {/* Footer */}
//             {(step === 0 || step === 1) && (
//                 <p className="text-center text-sm text-muted-foreground font-geist font-normal">
//                     Already have an account?{' '}
//                     <Link href="/login" className="text-primary font-medium hover:underline">
//                         Log in
//                     </Link>
//                 </p>
//             )}
//         </div>

//         {/* Policy */}
//         <div className='text-[#959595]'>
//             <p className='text-xs font-geist font-normal text-center'>By signing up, you agree to our <span className='underline'>terms</span> and <span className='underline'>privacy policy</span></p>
//         </div>
//     </div>
//   )
// }

// export default SignUp

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import rally from '@/public/Logo.svg'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

type FormData = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

type ErrorState = { [key: string]: string }

type stepField = {
    name: keyof FormData
    label: string
    type: string
    placeholder: string
}

type Step = {
    title: string
    description: string
    fields: stepField[]
}

const stepSchemas = [
    z.object({
        email: z.string().email({ message: 'Please enter a valid email address' }),
    }),
    z.object({
        password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
    z.object({
        name: z.string().min(2, { message: 'Name is required' }),
    }),
]

const steps: Step[] = [
    {
        title: 'Welcome to Rally',
        description: 'Turn group chats into real plans',
        fields: [
            { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
        ],
    },
    {
        title: 'Create your password',
        description: 'Pick somthing strong',
        fields: [
            { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
            { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
        ],
    },
    {
        title: 'What should we call you?',
        description: 'Enter your full name',
        fields: [
            { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
        ],
    },
]

const SignUp = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  
  // 2. Change: Initialize errors as an empty object
  const [errors, setErrors] = useState<ErrorState>({}) 
  
  const { setError: setAuthError, setUser } = useAuthStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Optional: Clear error for this field immediately when user types
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })
    }
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()

    // 3. Validate only current step fields
    const currentFields: Partial<FormData> = {}
    steps[step].fields.forEach(f => {
        const key = f.name as keyof FormData
        currentFields[key] = formData[key]
    })

    const result = stepSchemas[step].safeParse(currentFields)

    if (!result.success) {
        const newErrors: ErrorState = {}
        
        // 4. Map Zod issues to our error object
        result.error.issues.forEach((issue) => {
            const fieldName = issue.path[0] as string
            newErrors[fieldName] = issue.message
        })
        
        setErrors(newErrors)
        return // Stop here if there are errors
    }

    // Success: clear errors and move next
    setErrors({})
    if (step < steps.length - 1) {
        setStep(step + 1)
    } else {
        handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        id: '1',
        email: formData.email,
        name: formData.name,
      })
    } catch (err) {
      // Assign general errors to a specific key 'form' or handle separately
      setErrors({ form: 'Failed to create account. Please try again.' })
      setAuthError('Failed to create account')
    } finally {
      setIsSubmitting(false)
    }
  }

  const { title, description, fields } = steps[step]

  return (
    <div className='flex flex-col gap-8'>
        <div className="space-y-8">
            {/* Logo Section */}
            <div className="flex flex-col gap-6 justify-center items-center">
                <Image src={rally} alt="Rally Logo" width={40} height={40} />
                <div className="space-y-1.5 text-center">
                    <h1 className="text-[32px] font-bold leading-[120%] text-foreground font-bricolage">{title}</h1>
                    <p className="text-[#A3A3A3] font-medium text-sm leading-[150%] font-geist">{description}</p>
                </div>
            </div>

            {/* Google Button */}
            {step === 0 && (
                <>
                   <button
                        type="button"
                        className="w-full py-3 px-4 rounded-lg border border-[#E8E8E8] bg-background transition-colors flex items-center justify-center gap-3 text-[#767676] font-semibold font-geist cursor-pointer"
                    >
                        {/* Keep your SVG here */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Continue with Google
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-sm text-muted-foreground font-geist">OR</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                </>
            )}

            <div className='space-y-6'>
                {/* General API Error */}
                {errors.form && (
                    <div className="p-3 rounded-lg bg-[#FF7C7C]/10 text-[#FF7C7C] text-sm">
                        {errors.form}
                    </div>
                )}

                <form onSubmit={handleNext} className="space-y-4">
                    {fields.map((field) => {
                        // Check if this specific field has an error
                        const hasError = !!errors[field.name];
                        
                        return (
                            <div key={field.name} className="space-y-2">
                                <label className="block text-sm text-[#767676] font-medium font-geist">
                                    {field.label}
                                </label>
                                
                                <Input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name as keyof typeof formData]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    // 5. CRITICAL: Remove 'required' attribute to let Zod handle validation
                                    // 6. Apply conditional classes for Red Border and Ring
                                    className={`w-full px-4 py-3 rounded-lg border bg-background font-geist placeholder:text-[#BFBFBF] placeholder:font-geist transition-all
                                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                                        ${hasError 
                                            ? 'border-[#FF7C7C] focus-visible:ring-[#FF7C7C] text-[#FF7C7C]' 
                                            : 'border-[#E8E8E8] focus-visible:ring-primary'
                                        }
                                    `}
                                />
                                
                                {/* 7. Display Error Message */}
                                {hasError && (
                                    <p className="text-sm font-geist font-normal text-[#FF7C7C] mt-1 animate-in slide-in-from-top-1">
                                        {errors[field.name]}
                                    </p>
                                )}

                                {/* Password Hint (only show if no error) */}
                                {field.name === 'password' && step === 1 && !hasError && (
                                    <p className='text-xs font-geist font-normal text-muted-foreground'>
                                        Must be at least 8 characters
                                    </p>
                                )} 
                            </div>
                        )
                    })}

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : step < steps.length - 1 ? 'Continue' : "Let's Rally!"}
                    </Button>
                </form>
            </div>

            {/* Footer */}
            {(step === 0 || step === 1) && (
                <p className="text-center text-sm text-muted-foreground font-geist font-normal">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            )}
        </div>

        <div className='text-[#959595]'>
            <p className='text-xs font-geist font-normal text-center'>By signing up, you agree to our <span className='underline'>terms</span> and <span className='underline'>privacy policy</span></p>
        </div>
    </div>
  )
}

export default SignUp