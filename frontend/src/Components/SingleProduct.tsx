import React, { useState } from 'react';
import Thumbnail from './Thumbnail';
import DetailsSingleProduct from './DetailsSingleProduct';
import logoAssassinsCreed from "../Assets/Logos/image 20.svg";

// Updated Game interface to match your actual data structure
interface Game {
  id: string;
  title: string;
  price: string;
  category: string;
  supportedPlatforms: string[];
  rating: string; // Changed from number to string to match your data
  // Add other game properties as needed
}

// Define props for SVG Star component
interface StarSVGProps {
  filled: boolean;
  halfFilled?: boolean;
  hoverFill?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

// SVG Star component
const StarSVG: React.FC<StarSVGProps> = ({ 
  filled, 
  halfFilled = false, 
  hoverFill = false,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  // Colors for stars
  const filledColor = '#FFFFFF'; // white
  const emptyColor = '#808080'; // grey
  const hoverColor = '#FFFFFF'; // white for hover state

  const fillColor = hoverFill ? hoverColor : (filled ? filledColor : emptyColor);
  
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      style={{ 
        cursor: 'pointer',
        display: 'inline-block',
        marginRight: '2px'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Star shape */}
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={halfFilled ? emptyColor : fillColor}
      />
      
      {/* Clip path for half star */}
      {halfFilled && (
        <path
          d="M12 17.27L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill={filledColor}
        />
      )}
    </svg>
  );
};

// Function to determine tier based on rating
const getTierFromRating = (rating: number): string => {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 3.5) return "Good";
  if (rating >= 2.5) return "Average";
  if (rating >= 1.5) return "Poor";
  return "Very Poor";
};

// Define props for Star Rating component
interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showTier?: boolean;
}

// Star Rating component with interactive functionality and tier display
const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  interactive = false,
  onRatingChange,
  showTier = true
}) => {
  const maxStars = 5;
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  const handleMouseEnter = (starIndex: number): void => {
    if (interactive) {
      setHoverRating(starIndex + 1);
    }
  };
  
  const handleMouseLeave = (): void => {
    if (interactive) {
      setHoverRating(0);
    }
  };
  
  const handleClick = (starIndex: number): void => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };
  
  // Determine what rating to display (hover rating takes precedence if set)
  const displayRating: number = hoverRating > 0 ? hoverRating : rating;
  
  // Get the current tier
  const currentTier: string = getTierFromRating(displayRating);
  
  return (
    <div 
      style={{ 
        marginLeft: '15px',
        display: 'flex',
        alignItems: 'center'
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Render all stars */}
      {Array(maxStars).fill(0).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.floor(displayRating);
        const isHalfFilled = !isFilled && Math.ceil(displayRating) === starValue;
        const isHovered = interactive && hoverRating > 0;
        
        return (
          <StarSVG
            key={`star-${index}`}
            filled={isFilled}
            halfFilled={isHalfFilled}
            hoverFill={isHovered && starValue <= hoverRating}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
        );
      })}
      
      {/* Display the numerical rating and tier */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ 
          marginLeft: '5px', 
          fontSize: '15px',
          position: 'relative',
          top: '1px'
        }}>
          {displayRating}
        </span>
        
        {showTier && (
          <span style={{ 
            marginLeft: '5px', 
            fontSize: '14px',
            opacity: 0.8,
            position: 'relative',
            top: '1px'
          }}>
            ({currentTier})
          </span>
        )}
      </div>
    </div>
  );
};

// Define props for the main component
interface ResponsiveGameDetailsProps {
  game?: Game[] | null;
}

export default function ResponsiveGameDetails({ game }: ResponsiveGameDetailsProps) {
  // State to manage the user's rating - parse string rating to number
  const [userRating, setUserRating] = useState<number>(() => {
    if (game && game[0] && game[0].rating) {
      // Convert string rating to number
      const numRating = parseFloat(game[0].rating);
      return isNaN(numRating) ? 4.2 : numRating;
    }
    return 4.2; // Default rating
  });
  
  // Handle rating change
  const handleRatingChange = (newRating: number): void => {
    setUserRating(newRating);
    // Here you could add an API call to save the user's rating
    console.log(`User rated this game: ${newRating} stars`);
    console.log(`Tier: ${getTierFromRating(newRating)}`);
  };
  
  return (
    <div className="responsive-container-div" style={{ backgroundColor: '#101014', width: '100%' }}>
      <div className="responsive-container">
        <div className="header-section">
          <h1 className="game-title">
            {game && game[0] ? game[0].title : "Assassin's Creed Shadows"}
          </h1>
          <div className="rating-container">
            <StarRating 
              rating={userRating} 
              interactive={true} 
              onRatingChange={handleRatingChange}
              showTier={true}
            />
          </div>
        </div>
        <div className='right-side' style={{ 
          width: '20%', 
          height: '80%', 
          padding: '20px', 
          position: 'absolute', 
          right: '7%',
          top : '10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div className='right-side-content' style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%',

          }}>
            <img 
              src={logoAssassinsCreed} 
              alt="Assassin's Creed Shadows Logo" 
              style={{ width: '100px', height: 'auto', marginBottom: '30px' }} 
            />
            <span style={{ 
              fontSize: '13px', 
              fontWeight: 'bold', 
              color: 'white', 
              marginBottom: '20px'  , 
            }}>
              249 TND
            </span>
            <button style={{ 
              backgroundColor: '#26bbff', // Blue color for "Buy Now"
              color: 'black', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '5px', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              width: '80%', 
              marginBottom: '10px' 
            }}>
              Buy Now
            </button>
            <button style={{ 
              backgroundColor: '#343437', // Grey color for "Add to Cart"
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '5px', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              width: '80%' ,
            }}>
              Add to Cart
            </button>
          </div>
          <div style={{ 
            color: 'white', 
            fontSize: '14px', 
            width: '80%', 
            position: 'absolute',
            top:'60%',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Developer</span>
              <span>Ubisoft Entertainment</span>
            </div>
            <div style={{height:'1px' , width : '100%' , backgroundColor:'white' , marginBottom:'5px'}}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Release Date</span>
              <span>03/20/25</span>
            </div>
            <div style={{height:'1px' , width : '100%' , backgroundColor:'white' , marginBottom:'5px'}}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Platform</span>
              <span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M5.5 3h13c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-13c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm1 2v14h10V5H6.5zm2 2h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="thumbnail-section">
            <Thumbnail game={game} />
          </div>
          
          <div className="details-section">
            <DetailsSingleProduct />
          </div>
        </div>
        
        <style>{`
          .responsive-container {
            color: white;
            width: 60vw;
            padding: 0;
            display: flex;
            flex-direction: column;
          }
          
          .header-section {
            padding: 25px 25px 10px 25px;
          }
          
          .game-title {
            font-size: 30px;
            font-weight: bold;
            font-family: 'Bricolage Grotesque', sans-serif;
            margin: 0;
          }
          
          .rating-container {
            margin-top: 10px;
          }
          
          .content-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          
          .thumbnail-section {
            width: 100%;
            max-height: 560px;
          }
          
          .details-section {
            width: 100%;
            padding: 0 25px;
          }
          
          /* Media Queries for Responsive Design */
          @media screen and (max-width: 1200px) {
            .responsive-container {
              width: 75vw;
            }
          }
          
          @media screen and (max-width: 768px) {
            .responsive-container {
              width: 90vw;
            }
            
            .game-title {
              font-size: 24px;
            }
            
            .right-side {
              width: 100% !important;
              position: relative !important;
              height: auto !important;
              padding: 20px 0 !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}