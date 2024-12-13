'use client';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;

}

const Button: React.FC<ButtonProps> = ({ children, id, className, ...props }) => {
    return (
        <button
            id={id}
            className={`rounded-[12px]  px-6 py-4 text-[16px] bg-primary font-medium text-white hover:bg-[#4629af] transition-all   duration-200 ${className && className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;