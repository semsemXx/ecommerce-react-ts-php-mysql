import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logoAssassinsCreed from "../Assets/Logos/image 20.svg";
import BackgroundAssassinsCreed from "../Assets/Images/image-1.png" 
import LogoEldenRing from "../Assets/Logos/Group-1.svg"
import BackgroundEldenRing from "../Assets/Images/image-6.png"
import BackgroundTheLegendOfZelda from "../Assets/Images/image.png"
import LogoTheLegendOfZelda from "../Assets/Logos/image 7.svg"
import BackgroundSekiro from "../Assets/Images/image4.png"
import LogoSekiro from "../Assets/Logos/image 16.svg"
import BackgroundRedDeadRedemption from "../Assets/Images/image12.png"
import LogoRedDeadRedemption from "../Assets/Logos/image 11.svg"
import BackgroundResidentEvil from "../Assets/Images/image13.png"
import LogoResidentEvil from "../Assets/Logos/image 18.svg"
import BackgroundCOD from "../Assets/Images/image19.png"
import LogoCOD from "../Assets/Logos/image 17.svg"

// Define the game data interface
interface Game {
  id: number;
  name: string;
  headline: string;
  subheadline: string;
  backgroundImage: string;
  logoImage: string;
  buttonTheme: {
    primary: string;
    secondary: string;
  };
  buttons: {
    label: string;
    action: () => void;
  }[];
}

// Game data
const gameData: Game[] = [
  {
    id: 1,
    name: "Assassin's Creed Shadows",
    headline: "Master the Art of Shadows!",
    subheadline: "Become a shinobi or a samurai in feudal Japan's most immersive world",
    backgroundImage: BackgroundAssassinsCreed,
    logoImage: logoAssassinsCreed,
    buttonTheme: {
      primary: "#D30C14",
      secondary: "rgba(231, 30, 30, 0.2)"
    },
    buttons: [
      { label: "Join the Brotherhood", action: () => console.log("Buy now clicked") },
      { label: "SEE THE TRAILER", action: () => console.log("Trailer clicked") }
    ]
  },
  {
    id: 2,
    name: "Elden Ring",
    headline: "Rise, Tarnished!",
    subheadline: "Explore a vast open world filled with epic battles and deep lore.",
    backgroundImage: BackgroundEldenRing,
    logoImage: LogoEldenRing,
    buttonTheme: {
      primary: "#D4AF63",  // Gold color
      secondary: "rgba(188, 144, 62, 0.2)"
    },
    buttons: [
      { label: "BUY NOW", action: () => console.log("Pre-order clicked") },
      { label: "SEE THE TRAILER", action: () => console.log("Gameplay clicked") }
    ]
  },
  {
    id: 3,
    name: "The Legend of Zelda: Tears of the Kingdom",
    headline: "Unleash the Power of the Triforce!",
    subheadline: "Embark on an epic journey through Hyrule's skies and lands",
    backgroundImage: BackgroundTheLegendOfZelda,
    logoImage: LogoTheLegendOfZelda,
    buttonTheme: {
      primary: "#10b981",  // Green color
      secondary: "rgba(16, 185, 129, 0.2)"
    },
    buttons: [
      { label: "PLAY NOW", action: () => console.log("Play now clicked") },
      { label: "Explore Hyrule", action: () => console.log("Learn more clicked") }
    ]
  },
  {
    id: 4,
    name: "Sekiro: Shadows Die Twice",
    headline: "Carve Your Own Path to Vengeance!",
    subheadline: "Master the way of the shinobi in this brutal action-adventure.",
    backgroundImage: BackgroundSekiro,
    logoImage: LogoSekiro,
    buttonTheme: {
      primary: "#c89c49",  // Gold color
      secondary: "rgba(200, 156, 73, 0.2)"
    },
    buttons: [
      { label: "Face Your Destiny", action: () => console.log("Get started clicked") },
      { label: "Watch the Combat", action: () => console.log("Watch trailer clicked") }
    ]
  },
  {
    id: 5,
    name: "Red Dead Redemption 2",
    headline: "Outlaws for Life!",
    subheadline: "Live the ultimate cowboy adventure in an open-world western.",
    backgroundImage: BackgroundRedDeadRedemption,
    logoImage: LogoRedDeadRedemption,
    buttonTheme: {
      primary: "#FF0000",  // Red color
      secondary: "rgba(242, 19, 19, 0.2)"
    },
    buttons: [
      { label: "Ride Now", action: () => console.log("Get started clicked") },
      { label: "See the Frontier", action: () => console.log("Watch trailer clicked") }
    ]
  },
  {
    id: 6,
    name: "Resident Evil 4 Remake",
    headline: "Survive the Nightmare!",
    subheadline: "Face your fears in this terrifying, action-packed horror remake.",
    backgroundImage: BackgroundResidentEvil,
    logoImage: LogoResidentEvil,
    buttonTheme: {
      primary: "#BF182B",  // Red color
      secondary: "rgba(189, 26, 26, 0.2)"
    },
    buttons: [
      { label: "Survive Now", action: () => console.log("Get started clicked") },
      { label: "See the Horror", action: () => console.log("Watch trailer clicked") }
    ]
  },
  {
    id: 7,
    name: "Call of Duty Black Ops III",
    headline: "The Future is Black!",
    subheadline: "Engage in intense combat with advanced warfare and cybernetic soldiers.",
    backgroundImage: BackgroundCOD,
    logoImage: LogoCOD,
    buttonTheme: {
      primary: "#FF6800",  // Orange color
      secondary: "rgba(249, 115, 22, 0.2)"
    },
    buttons: [
      { label: "Deploy Now", action: () => console.log("Get started clicked") },
      { label: "Watch the Action", action: () => console.log("Watch trailer clicked") }
    ]
  }
];

const GameCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [transitioning, setTransitioning] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Check screen width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (!transitioning) {
      setActiveUser(true);
      setTransitioning(true);
      setActiveIndex((current) => (current === gameData.length - 1 ? 0 : current + 1));
    }
  };

  const prevSlide = () => {
    if (!transitioning) {
      setActiveUser(true);
      setTransitioning(true);
      setActiveIndex((current) => (current === 0 ? gameData.length - 1 : current - 1));
    }
  };

  const goToSlide = (index: number) => {
    if (!transitioning && index !== activeIndex) {
      setActiveUser(true);
      setTransitioning(true);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => setTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  useEffect(() => {
    if (activeUser) return;

    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [activeUser]);

  useEffect(() => {
    if (activeUser) {
      const inactivityTimeout = setTimeout(() => {
        setActiveUser(false);
      }, 10000);
      return () => clearTimeout(inactivityTimeout);
    }
  }, [activeUser]);

  const renderNavigationItems = () => {
    // Show fewer items on smaller screens
    if (screenWidth <= 640) {
      const visibleIndices = [
        (activeIndex - 1 + gameData.length) % gameData.length,
        activeIndex,
        (activeIndex + 1) % gameData.length
      ];

      return visibleIndices.map((index) => {
        const isActive = index === activeIndex;
        const game = gameData[index];

        return (
          <div 
            key={`game-${index}`} 
            className={`game-indicator ${isActive ? 'active' : ''}`}
          >
            <button
              onClick={() => goToSlide(index)}
              className={`game-button ${isActive ? 'active' : 'inactive'}`}
              aria-label={game.name}
            >
              <span className={`game-name ${isActive ? 'hidden' : ''}`}>
                {screenWidth <= 480 ? 
                  // On very small screens, may need to truncate
                  (game.name.length > 10 ? `${game.name.substring(0, 10)}...` : game.name) : 
                  game.name
                }
              </span>
              {isActive && (
                <div className={`game-logo-wrapper ${isActive ? 'active' : ''}`}>
                  <img 
                    src={game.logoImage} 
                    alt={`${game.name} logo`}
                    className="game-logo"
                  />
                </div>
              )}
            </button>
          </div>
        );
      });
    }
    
    // For larger screens, calculate visible items based on width
    const numItemsToShow = screenWidth < 960 ? 3 : 5;
    let indices = [];
    
    if (numItemsToShow === 5) {
      // Show 5 items with active in middle
      indices = [
        (activeIndex - 2 + gameData.length) % gameData.length,
        (activeIndex - 1 + gameData.length) % gameData.length,
        activeIndex,
        (activeIndex + 1) % gameData.length,
        (activeIndex + 2) % gameData.length
      ];
    } else {
      // Show 3 items with active in middle
      indices = [
        (activeIndex - 1 + gameData.length) % gameData.length,
        activeIndex,
        (activeIndex + 1) % gameData.length
      ];
    }

    return indices.map((index) => {
      const isActive = index === activeIndex;
      const game = gameData[index];

      return (
        <div 
          key={`game-${index}`} 
          className={`game-indicator ${isActive ? 'active' : ''}`}
        >
          <button
            onClick={() => goToSlide(index)}
            className={`game-button ${isActive ? 'active' : 'inactive'}`}
            aria-label={game.name}
          >
            <span className={`game-name ${isActive ? 'hidden' : ''}`}>
              {game.name}
            </span>
            {isActive && (
              <div className={`game-logo-wrapper ${isActive ? 'active' : ''}`}>
                <img 
                  src={game.logoImage} 
                  alt={`${game.name} logo`}
                  className="game-logo"
                />
              </div>
            )}
          </button>
        </div>
      );
    });
  };

  const activeGame = gameData[activeIndex];

  return (
    <div className="carousel-container">
      <div 
        className={`carousel-background ${transitioning ? 'transitioning' : ''}`}
        style={{
          backgroundImage: `url(${activeGame.backgroundImage})`,
        }}
      />
      <div className="carousel-overlay" />
      
      <div className="carousel-content">
        <div className={`content-inner ${transitioning ? 'transitioning' : ''}`}>
          <h1 className="carousel-headline">{activeGame.headline}</h1>
          <p className="carousel-subheadline">{activeGame.subheadline}</p>
          
          <div className="button-container">
            {activeGame.buttons.map((button, i) => (
              <button 
                key={i}
                onClick={button.action}
                className={i === 0 ? 'primary-button' : 'secondary-button'}
                style={i === 0 
                  ? { backgroundColor: activeGame.buttonTheme.primary } 
                  : { 
                      borderColor: activeGame.buttonTheme.primary,
                      backgroundColor: activeGame.buttonTheme.secondary
                    }
                }
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="carousel-navigation">
        <div className="nav-content">
          <button 
            onClick={prevSlide} 
            className="nav-button left-arrow"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="game-name-container">
            {renderNavigationItems()}
          </div>

          <button 
            onClick={nextSlide} 
            className="nav-button right-arrow"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .carousel-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          user-select: none;
        }

        .carousel-background {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-size: cover;
          background-position: center;
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          background-blend-mode: multiply;
          transform: scale(1.1);
          will-change: opacity, transform;
          opacity: 1;
        }

        .carousel-background.transitioning {
          opacity: 0.7;
          transform: scale(1.15);
        }

        .carousel-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
         
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          transition: opacity 0.5s ease;
        }

        .carousel-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80%;
          padding: 0 32px;
          color: white;
          text-align: center;
          z-index: 1;
        }

        .content-inner {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
          opacity: 1;
          will-change: transform, opacity;
          width: 100%;
          max-width: 1200px;
        }

        .content-inner.transitioning {
          transform: translateY(20px);
          opacity: 0;
        }

        .carousel-headline {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: clamp(0.5rem, 2vw, 1rem);
          letter-spacing: 0.05em;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3);
          text-transform: uppercase;
        }

        .carousel-subheadline {
          font-size: clamp(1rem, 3vw, 1.5rem);
          margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
          opacity: 0.95;
          text-shadow: 0 1px 3px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }

        .button-container {
          display: flex;
          gap: clamp(0.75rem, 3vw, 1.5rem);
          justify-content: center;
          flex-wrap: wrap;
        }

        .primary-button, .secondary-button {
          padding: clamp(10px, 2vw, 12px) clamp(20px, 4vw, 32px);
          border-radius: 9999px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          min-width: 160px;
        }

        .primary-button {
          border: none;
          /* backgroundColor set inline via style prop */
        }

        .primary-button:hover {
          filter: brightness(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .primary-button:active {
          filter: brightness(0.95);
        }

        .secondary-button {
          background-color: transparent;
          border: 2px solid;
          /* borderColor & backgroundColor set inline via style prop */
        }

        .secondary-button:hover {
          filter: brightness(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .secondary-button:active {
          filter: brightness(0.95);
        }

        .carousel-navigation {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(1rem, 3vw, 1.5rem) 0;
          z-index: 2;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          width: 100%;  
          max-width: 1200px;
          padding: 0 clamp(1rem, 3vw, 2rem);
          position: relative;
        }

        .nav-button {
          background: rgba(175, 175, 175, 0.2);
          border: none;
          border-radius: 50%;
          padding: clamp(8px, 2vw, 12px);
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .nav-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .nav-button:active {
          background: rgba(255, 255, 255, 0.4);
        }

        .left-arrow {
          position: absolute;
          left: clamp(0.5rem, 2vw, 2rem);
          top: 50%;
          transform: translateY(-50%);
        }

        .right-arrow {
          position: absolute;
          right: clamp(0.5rem, 2vw, 2rem);
          top: 50%;
          transform: translateY(-50%);
        }

        .game-name-container {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: clamp(1.5rem, 3vw, 3rem);
          width: 100%;
          margin: 0 auto;
          position: relative;
          max-width: 1000px;
          padding-bottom: 1rem;
        }

        .game-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: clamp(90px, 15vw, 150px);
          transition: all 0.3s ease;
          position: relative;
          min-height: 80px;
        }

        .game-indicator.active {
          transform: scale(1.1);
          opacity: 1;
        }

        .game-button {
          background-color: transparent;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 8px;
          width: 100%;
          height: 100%;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          color: white;
          position: relative;
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        .game-button.active {
          transform: scale(1.1);
        }

        .game-button.inactive {
          opacity: 0.6;
          pointer-events: auto;
        }

        .game-button.inactive:hover {
          opacity: 0.9;
        }

        .game-name {
          transition: opacity 0.3s ease;
          opacity: 1;
          position: absolute;
          bottom: -20px;
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          text-align: center;
          width: 100%;
          padding: 0 5px;
          line-height: 1.2;
          text-shadow: 0 1px 2px rgba(0,0,0,0.7);
          font-weight: 500;
        }

        /* Full game name styles for larger screens */
        @media (min-width: 1024px) {
          .game-name {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
            width: 180px;
          }
        }
        
        /* Adjusted game name styles for medium screens */
        @media (min-width: 641px) and (max-width: 1023px) {
          .game-name {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
            width: 160px;
            font-size: 0.95rem;
          }
          
          .game-name-container {
            gap: 2rem;
          }
        }

        .game-name.hidden {
          opacity: 0;
        }

        .game-logo-wrapper {
          width: clamp(90px, 15vw, 150px);
          height: clamp(90px, 15vw, 150px);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          bottom: -20px;
        }

        .game-logo-wrapper.active {
          bottom: 0;
        }

        .game-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.7)) drop-shadow(0 2px 8px rgba(0,0,0,0.5));
          max-width: 100%;
          max-height: 100%;
        }

        /* Comprehensive media queries for all breakpoints */
        @media (max-width: 1024px) {
          .game-name-container {
            gap: clamp(1rem, 2vw, 2.5rem);
          }
          
          .game-indicator {
            width: clamp(80px, 13vw, 130px);
          }
          
          .game-logo-wrapper {
            width: clamp(80px, 13vw, 130px);
            height: clamp(80px, 13vw, 130px);
          }
        }

        @media (max-width: 768px) {
          .carousel-content {
            height: 75%;
            padding-bottom: 2rem;
          }
          
          .game-name-container {
            gap: clamp(0.8rem, 2vw, 2rem);
            justify-content: center;
          }
          
          .game-indicator {
            width: clamp(70px, 11vw, 110px);
            min-height: 70px;
          }
          
          .game-logo-wrapper {
            width: clamp(70px, 11vw, 110px);
            height: clamp(70px, 11vw, 110px);
          }
          
          .game-name {
            font-size: 0.9rem;
            width: 140px;
            white-space: normal;
          }
          
          .nav-button {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
        }

        /* This is the critical breakpoint fix for ~580px where issues were occurring */
        @media (max-width: 640px) {
          .carousel-content {
            height: 70%;
            padding-bottom: 1.5rem;
          }
          
          .carousel-headline {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
          }
          
          .carousel-subheadline {
            font-size: clamp(0.9rem, 2.5vw, 1.2rem);
            margin-bottom: 1.5rem;
          }
          
          .button-container {
            gap: 0.75rem;
          }
          
          .primary-button, .secondary-button {
            min-width: 140px;
            padding: 8px 16px;
            font-size: 0.85rem;
          }
          
          .game-name-container {
            gap: 1rem;
            padding: 0 1.5rem;
          }
          
          .game-indicator {
            width: 90px;
            min-height: 60px;
          }
          
          .game-logo-wrapper {
            width: 90px;
            height: 90px;
          }
          
          .game-name {
            font-size: 0.9rem;
            bottom: -18px;
            width: 110px;
            white-space: normal;
          }
          
          .left-arrow, .right-arrow {
            background: rgba(0, 0, 0, 0.5);
          }
        }

        @media (max-width: 480px) {
          .carousel-content {
            height: 65%;
            justify-content: flex-end;
            padding-bottom: 1rem;
          }
          
          .button-container {
            flex-direction: column;
            align-items: center;
          }
          
          .primary-button, .secondary-button {
            width: 100%;
            max-width: 250px;
          }
          
          .game-name-container {
            width: 100%;
            justify-content: center;
            overflow-x: auto;
            padding-bottom: 2rem;
            -webkit-overflow-scrolling: touch;
            scroll-padding: 0.5rem;
            gap: 0.5rem;
          }
          
          .game-indicator {
            flex-shrink: 0;
            width: 80px;
            min-height: 50px;
          }
          
          .game-logo-wrapper {
            width: 80px;
            height: 80px;
          }
          
          .nav-content {
            padding: 0 0.5rem;
          }
          
          .game-name {
            font-size: 0.8rem;
            bottom: -20px;
            width: 90px;
          }
        }
        
        /* Ensure scrollbar doesn't cause layout issues */
        .game-name-container::-webkit-scrollbar {
          height: 0;
          width: 0;
          display: none;
        }
        
        .game-name-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default GameCarousel;