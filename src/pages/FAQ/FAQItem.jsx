/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQItem = (props) => {
    const { question, answer } = props.data;
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='my-8 p-4 border-b border-b-slate-300'>
            <div className='flex justify-between items-center cursor-pointer' onClick={toggleOpen}>
                <span className='font-bold text-md lg:text-lg'>{question}</span>
                <span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </div>
            <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-500 ease-in-out`}
                style={{ maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px' }}
            >
                <div className='mt-2 text-md'>
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default FAQItem;
