"use client"

import { useEffect, useRef, useState } from "react";

type Props = {
    placeholder?: string;
    name: string;
    id: string;
    reset?: boolean;
    onResetHandled?: () => void;
};

export default function UserInput({ placeholder, name, id, reset, onResetHandled }: Props) {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    useEffect(() => {
        if (reset) {
            setValue('');
            onResetHandled?.();
        }
    }, [reset, onResetHandled]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const onEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            (document.getElementById(id)?.parentElement as HTMLFormElement).requestSubmit();
        }
    };

    return (
        <textarea
            className="mb-2 focus:outline-0 max-w-full w-full max-h-52 h-fit overflow-y-auto resize-none"
            id={id}
            name={name}
            placeholder={placeholder}
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={onEnterPress}
        />
    );
}
