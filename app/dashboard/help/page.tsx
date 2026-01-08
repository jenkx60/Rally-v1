import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion'
import { ArrowRight, Mail } from 'lucide-react'
import React from 'react'

const faqs = [
  {
    id: 'item-1',
    question: 'How do I create an event',
    answer: 'From your dashboard, click Create Event fill in the details (name, date, location, price, image), and hit publish. Your event goes live immediately.'
  },
  {
    id: "item-2",
    question: "How can I share my event?",
    answer: "You can share your event by copying the unique event link from your dashboard or using the built-in social share buttons."
  },
  {
    id: "item-3",
    question: "Can I see who's coming?",
    answer: "Yes, the 'Attendees' tab in your sidebar provides a real-time list of everyone who has registered or purchased tickets for your event."
  },
  {
    id: "item-4",
    question: "When do payouts happen?",
    answer: "Payouts are typically processed within 3-5 business days after your event has successfully concluded."
  },
  {
    id: "item-5",
    question: "How do I edit my event?",
    answer: "Navigate to the 'Events' tab, select the event you wish to modify, and click the 'Edit' button to update your details."
  },
  {
    id: "item-6",
    question: "What happens if i cancel my event?",
    answer: "If you cancel an event, all ticket holders will be notified automatically, and refunds will be processed according to our cancellation policy."
  }
]

const HelpPage = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-[730px] mx-auto px-0 py-10 md:p-12 space-y-10 md:space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-1.5">
        <h1 className="font-bricolage text-[28px] md:text-[32px] font-bold text-[#1A1A1A] leading-[120%] tracking-[-1px]">
          How can we help?
        </h1>
        <p className="font-geist font-medium text-[13px] md:text-[14px] text-[#A3A3A3] leading-[150%] tracking-[-0.1px]">
          We&apos;re here to help you rally your people
        </p>
      </div>

      {/* Talk to Us Card */}
      {/* Check shadow */}
      <div className="w-full border border-[#0000000D] rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-xs shadow-[#1A1A1A0D]"> 
        <div className="shrink-0 w-12 h-12 rounded-lg bg-[#F0EEFA] flex items-center justify-center">
          <Mail className="w-6 h-6 text-[#6A59CE]" />
        </div>
        <div className="space-y-1">
          <div className='space-y-0.5 leading-[150%]'>
            <h3 className="font-geist font-medium text-[#333333] text-[15px] tracking-[-0.2px]">Talk to us</h3>
            <p className="font-geist font-normal text-[#959595] text-[12px] md:text-[14px] tracking-[-0.1px]">
              We usually reply within 24 hours (weekdays)
            </p>
          </div>
          <a 
            href="mailto:support@rally.com" 
            className="inline-flex items-center text-[#6A59CE] font-medium text-[14px] leading-[135%] tracking-[-0.2px] hover:underline"
          >
            support@rally.com <span className="ml-1 pt-0.5"><ArrowRight className='w-4 h-4' /></span>
          </a>
        </div>
      </div>

      {/* Accordion FAQs */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq) => (
          <AccordionItem 
            key={faq.id} 
            value={faq.id}
            className="border border-[#0000000D] rounded-2xl px-6 bg-white overflow-hidden transition-all shadow-xs shadow-[#1A1A1A0D]"
          >
            <AccordionTrigger className="hover:no-underline py-5 font-geist font-medium text-[15px] text-[#333333] text-left leading-[150%] tracking-[-0.2px] cursor-pointer">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="font-geist font-normal text-[14px] text-[#767676] leading-[150%] tracking-[-0.1px] w-[288px] md:w-[558px]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  )
}

export default HelpPage