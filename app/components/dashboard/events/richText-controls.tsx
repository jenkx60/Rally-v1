import React from 'react'
import bold from '@/public/Sidebar/bold_line.svg';
import italic from '@/public/Sidebar/italic_line.svg';
import underline from '@/public/Sidebar/underline_line.svg';
import alignLeft from '@/public/Sidebar/align_left_line.svg';
import alignCenter from '@/public/Sidebar/align_center_line.svg';
import link from '@/public/Sidebar/link_line.svg';
import { Button } from '../../ui/button';
import Image from 'next/image';

interface RichTextControlsProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}
const RichTextControls: React.FC<RichTextControlsProps> = ({ textareaRef }) => {
    const applyFormat = (type: 'bold' | 'italic' | 'underline' | 'link' | 'alignLeft' | 'alignCenter') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        const selectedText = value.substring(start, end);

        let newText = value;
        let newCursorPos = end;

        switch (type) {
            case 'bold':
                newText = value.substring(0, start) + `**${selectedText}**` + value.substring(end);
                newCursorPos += 4;
                break;
            case 'italic':
                newText = value.substring(0, start) + `*${selectedText}*` + value.substring(end);
                newCursorPos += 2;
                break;
            case 'underline':
                newText = value.substring(0, start) + `__${selectedText}__` + value.substring(end);
                newCursorPos += 4;
                break;
            case 'link':
                const url = prompt("Enter URL:", "https://");
                if (url) {
                    const linkText = selectedText || "link";
                    newText = value.substring(0, start) + `[${linkText}](${url})` + value.substring(end);
                    newCursorPos = start + linkText.length + url.length + 4;
                } else {
                    return;
                }
                break;
            case 'alignLeft':
                newText = value.substring(0, start) + `<div style="text-align: left;">${selectedText}</div>` + value.substring(end);
                newCursorPos += 30;
                break;
            case 'alignCenter':
                newText = value.substring(0, start) + `<div style="text-align: center;">${selectedText}</div>` + value.substring(end);
                newCursorPos += 32;
                break;
        }
        textarea.value = newText;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();

        // To update the React controlled input
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
        if (nativeInputValueSetter) {
            nativeInputValueSetter.call(textarea, newText);
        }

        // To dispatch input event so react state updates
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);

        // to restore focus and update the selection so user can keep typing
        textarea.focus();

        if (start === end) {
            // if no text is selected, place cursor in between the tags
            const offset = type === 'bold' ? 2 : type === 'italic' ? 1 : type === 'underline' ? 3 : 0;
            textarea.setSelectionRange(start + offset, start + offset);
        } else {
            // if text is selected keep formating
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }
    };

    // const executeCommand = (command: string, value?: string) => {
    //     if (textareaRef.current) {
    //         textareaRef.current.focus()
    //         document.execCommand(command, false, value);
    //     }
    // };

  return (
    <div className='flex items-center gap-5 border-b border-[#E8E8E8] bg-[#FAFAFA] rounded-tl-xl rounded-tr-xl  px-3.5 py-2.5'>
        <button
            type='button'
            onClick={() => applyFormat('bold')}
            className='hover:bg-[#F5F5F5] p-1 rounded-[8px] cursor-pointer'
        >
            <Image src={bold} alt='bold' width={20} height={20} priority={true} />
        </button>
        <button
            type='button'
            onClick={() => applyFormat('italic')}
            className='hover:bg-[#F5F5F5] p-1 rounded-[8px] cursor-pointer'
        >
            <Image src={italic} alt='bold' width={20} height={20} priority={true} />
        </button>
        <button
            type='button'
            onClick={() => applyFormat('underline')}
            className='hover:bg-[#F5F5F5] p-1 rounded-[8px] cursor-pointer'
        >
            <Image src={underline} alt='bold' width={20} height={20} priority={true} />
        </button>
        <div className="h-5 w-0.5 bg-[#E8E8E8] mx-1" />
        <button
            type='button'
            onClick={() => applyFormat('alignLeft')}
            className='hover:bg-[#F5F5F5] p-1 rounded-[8px] cursor-pointer'
        >
            <Image src={alignLeft} alt='bold' width={20} height={20} priority={true} />
        </button>
        <button
            type='button'
            onClick={() => applyFormat('alignCenter')}
            className='hover:bg-[#F5F5F5] p-1 rounded-[8px] cursor-pointer'
        >
            <Image src={alignCenter} alt='bold' width={20} height={20} priority={true} />
        </button>
        <div className="h-5 w-0.5 bg-[#E8E8E8] mx-1" />
        <button
            type='button'
            onClick={() => applyFormat('link')}
            className='hover:bg-[#F5F5F5] p-1 rounded-[8px] cursor-pointer'
        >
            <Image src={link} alt='bold' width={20} height={20} priority={true} />
        </button>
    </div>
  )
}

export default RichTextControls