import React from 'react'
import bold from '@/public/Sidebar/bold_line.svg';
import italic from '@/public/Sidebar/italic_line.svg';
import underline from '@/public/Sidebar/underline_line.svg';
import alignLeft from '@/public/Sidebar/align_left_line.svg';
import alignCenter from '@/public/Sidebar/align_center_line.svg';
import link from '@/public/Sidebar/link_line.svg';
import { Button } from '../ui/button';
import Image from 'next/image';

interface RichTextControlsProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}
const RichTextControls: React.FC<RichTextControlsProps> = ({ textareaRef }) => {

    const executeCommand = (command: string, value?: string) => {
        if (textareaRef.current) {
            textareaRef.current.focus()
            document.execCommand(command, false, value);
        }
    };
  return (
    <div className='flex items-center gap-5 border-b border-[#E8E8E8] bg-[#FAFAFA] rounded-tl-xl rounded-tr-xl px-3.5 py-2.5'>
        <button
            type='button'
            onClick={() => executeCommand('bold')}
        >
            <Image src={bold} alt='bold' width={20} height={20} />
        </button>
        <button
            type='button'
            onClick={() => executeCommand('italic')}
        >
            <Image src={italic} alt='bold' width={20} height={20} />
        </button>
        <button
            type='button'
            onClick={() => executeCommand('underline')}
        >
            <Image src={underline} alt='bold' width={20} height={20} />
        </button>
        <div className="h-5 w-0.5 bg-[#E8E8E8] mx-1" />
        <button
            type='button'
            onClick={() => executeCommand('alignLeft')}
        >
            <Image src={alignLeft} alt='bold' width={20} height={20} />
        </button>
        <button
            type='button'
            onClick={() => executeCommand('alignCenter')}
        >
            <Image src={alignCenter} alt='bold' width={20} height={20} />
        </button>
        <div className="h-5 w-0.5 bg-[#E8E8E8] mx-1" />
        <button
            type='button'
            onClick={() => executeCommand('createLink', 'http://example.com')}
        >
            <Image src={link} alt='bold' width={20} height={20} />
        </button>
    </div>
  )
}

export default RichTextControls