import React, { useState, useEffect } from 'react';

export default function Helper() {
  const [isHalfway, setIsHalfway] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const halfwayPoint = document.documentElement.scrollHeight / 2;
      setIsHalfway(scrolled > halfwayPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: isHalfway ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        backgroundColor: '#333',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        transition: 'background-color 0.3s, transform 0.3s ease-in-out',
        transform: isHalfway ? 'rotate(0deg)' : 'rotate(180deg)',
      }}
      onClick={handleClick}
      title={isHalfway ? 'Scroll to top' : 'Scroll to bottom'}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#555')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#333')}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </div>
  );
}
