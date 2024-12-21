import React, { useState, useEffect } from 'react';
import './TypeEffect.css';

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const words = [' Access premium courses taught by industry experts from top companies and universities.', ' Master in-demand skills in Programming, Data Science, AI and Design', 'Do Business with hands-on projects and personalized learning paths'];

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[index];
      if (deleting) {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setDeleting(false);
          setIndex((index + 1) % words.length);
        }
      } else {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setDeleting(true);
        }
      }
    };

    const typingSpeed = deleting ? 100 : 200;
    const timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <div className="typing-effect">
      <span className='text'>{text}</span>
      <span className="cursor">|</span>
    </div>
  );
};

export default TypingEffect;
