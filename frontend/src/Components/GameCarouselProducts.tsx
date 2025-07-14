import React, { useState, useRef, useEffect } from "react";
import BackgroundAssassinsCreed from "../Assets/Images/image-1.png";
import BackgroundEldenRing from "../Assets/Images/image-6.png";
import BackgroundSekiro from "../Assets/Images/image4.png";
import BackgroundRedDeadRedemption from "../Assets/Images/image12.png";
import BackgroundResidentEvil from "../Assets/Images/image13.png";
import BackgroundCOD from "../Assets/Images/image19.png";
import BackgroundTheLegendOfZelda from "../Assets/Images/image.png";

// Update the Game interface
interface Game {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  category: string;
  imageUrl: string;
  free?: boolean;
  supportedPlatforms: string[]; // Add this new property
  releaseDate : Date ;
}

export interface SearchFilters {
  query: string;
  category: string;
  dateSort: string;
  priceRange: {
    min: number;
    max: number;
  };
  priceSort: string;
  device: string;
}

// Define props for GameCarousel
interface GameCarouselProps {
  category: string;  // Change from 'title' to 'category'
  games: Game[];
  filters: SearchFilters;
}

// Add the DeviceIcon component before GameCard
const DeviceIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'PlayStation':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor" strokeWidth="1">
          <path d="M22.584 17.011c-.43.543-1.482.93-1.482.93l-7.833 2.817V18.68l5.764-2.057c.655-.234.755-.566.223-.74-.53-.175-1.491-.125-2.146.111l-3.84 1.354v-2.155l.22-.075s1.11-.394 2.671-.567c1.56-.172 3.472.024 4.972.593 1.69.535 1.88 1.323 1.451 1.866zm-8.57-3.537V8.162c0-.624-.114-1.198-.699-1.36-.447-.144-.725.272-.725.895V21l-3.584-1.139V4c1.524.283 3.744.953 4.937 1.355 3.035 1.043 4.064 2.342 4.064 5.267 0 2.851-1.758 3.932-3.992 2.852zm-11.583 4.99c-1.735-.49-2.024-1.51-1.233-2.097.731-.542 1.974-.95 1.974-.95l5.138-1.83v2.086l-3.697 1.325c-.653.234-.754.566-.223.74.531.175 1.493.125 2.147-.11l1.773-.644v1.865l-.353.06c-1.774.29-3.664.169-5.526-.445z"></path>
        </svg>
      );
    case 'Windows':
      return (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="#ffffff" stroke="currentColor" strokeWidth="1">
          <path d="M1,15H12a1,1,0,0,0,1-1V4.17a1,1,0,0,0-.35-.77,1,1,0,0,0-.81-.22L.84,5A1,1,0,0,0,0,6v8A1,1,0,0,0,1,15ZM2,6.85l9-1.5V13H2Z"></path>
          <path d="M30.84,0l-15,2.5a1,1,0,0,0-.84,1V14a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V1a1,1,0,0,0-.35-.76A1,1,0,0,0,30.84,0ZM30,13H17V4.35L30,2.18Z"></path>
          <path d="M.84,27l11,1.83H12a1,1,0,0,0,1-1V18a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v8A1,1,0,0,0,.84,27ZM2,19h9v7.65l-9-1.5Z"></path>
          <path d="M31,17H16a1,1,0,0,0-1,1V28.5a1,1,0,0,0,.84,1l15,2.5H31a1,1,0,0,0,.65-.24A1,1,0,0,0,32,31V18A1,1,0,0,0,31,17ZM30,29.82,17,27.65V19H30Z"></path>
        </svg>
      );
    case 'Xbox':
      return (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="#ffffff" stroke="currentColor" strokeWidth="1">
          <path d="M16 5.425c-1.888-1.125-4.106-1.922-6.473-2.249l-0.092-0.010c-0.070-0.005-0.152-0.008-0.234-0.008-0.613 0-1.188 0.16-1.687 0.441l0.017-0.009c2.357-1.634 5.277-2.61 8.426-2.61 0.008 0 0.016 0 0.024 0h0.019c0.005 0 0.011 0 0.018 0 3.157 0 6.086 0.976 8.501 2.642l-0.050-0.033c-0.478-0.272-1.051-0.433-1.662-0.433-0.085 0-0.169 0.003-0.252 0.009l0.011-0.001c-2.459 0.336-4.677 1.13-6.648 2.297l0.082-0.045zM5.554 5.268c-0.041 0.014-0.077 0.032-0.11 0.054l0.002-0.001c-2.758 2.723-4.466 6.504-4.466 10.684 0 3.584 1.256 6.875 3.353 9.457l-0.022-0.028c-1.754-3.261 4.48-12.455 7.61-16.159-3.53-3.521-5.277-4.062-6.015-4.062-0.010-0-0.021-0.001-0.032-0.001-0.115 0-0.225 0.021-0.326 0.060l0.006-0.002zM20.083 9.275c3.129 3.706 9.367 12.908 7.605 16.161 2.075-2.554 3.332-5.845 3.332-9.43 0-4.181-1.709-7.962-4.467-10.684l-0.002-0.002c-0.029-0.021-0.063-0.039-0.1-0.052l-0.003-0.001c-0.1-0.036-0.216-0.056-0.336-0.056-0.005 0-0.011 0-0.016 0h0.001c-0.741-0-2.485 0.543-6.014 4.063zM6.114 27.306c2.627 2.306 6.093 3.714 9.888 3.714s7.261-1.407 9.905-3.728l-0.017 0.015c2.349-2.393-5.402-10.901-9.89-14.29-4.483 3.39-12.24 11.897-9.886 14.29z"></path>
        </svg>
      );
    case 'VR':
      return (
        <div style={{ transform: 'translate(12px, 12px)' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#ffffff" stroke="currentColor" strokeWidth="1">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 2H16V14H10.5L9 11H7L5.5 14H0V2ZM6 7C6 8.10457 5.10457 9 4 9C2.89543 9 2 8.10457 2 7C2 5.89543 2.89543 5 4 5C5.10457 5 6 5.89543 6 7ZM12 9C13.1046 9 14 8.10457 14 7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7C10 8.10457 10.8954 9 12 9Z" fill="#ffffff"></path>
          </svg>
        </div>
      );
    case 'Nintendo':
      return (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="#ffffff" stroke="currentColor" strokeWidth="1">
          <path d="M18.901 32h4.901c4.5 0 8.198-3.698 8.198-8.198v-15.604c0-4.5-3.698-8.198-8.198-8.198h-5c-0.099 0-0.203 0.099-0.203 0.198v31.604c0 0.099 0.099 0.198 0.302 0.198zM25 14.401c1.802 0 3.198 1.5 3.198 3.198 0 1.802-1.5 3.198-3.198 3.198-1.802 0-3.198-1.396-3.198-3.198-0.104-1.797 1.396-3.198 3.198-3.198zM15.198 0h-7c-4.5 0-8.198 3.698-8.198 8.198v15.604c0 4.5 3.698 8.198 8.198 8.198h7c0.099 0 0.203-0.099 0.203-0.198v-31.604c0-0.099-0.099-0.198-0.203-0.198zM12.901 29.401h-4.703c-3.099 0-5.599-2.5-5.599-5.599v-15.604c0-3.099 2.5-5.599 5.599-5.599h4.604zM5 9.599c0 1.698 1.302 3 3 3s3-1.302 3-3c0-1.698-1.302-3-3-3s-3 1.302-3 3z"></path>
        </svg>
      );
    default:
      return null;
  }
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11, so add 1) and pad
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// GameCard component
const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-image-container">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="game-image"
        />
        <span className="release-date">
          {formatDate(game.releaseDate)}
        </span>
      </div>
      <div className="game-category">
        <div className="platform-icons">
          {game.supportedPlatforms.map((platform) => (
            <span key={platform} className="platform-icon">
              <DeviceIcon type={platform} />
            </span>
          ))}
        </div>
      </div>
      <div className="game-title">{game.title}</div>
      <div className="price-container">
        {game.discount && (
          <span className="discount-badge">
            {game.discount}
          </span>
        )}
        {game.originalPrice && (
          <span className="original-price">
            {game.originalPrice}
          </span>
        )}
        {game.free ? (
          <span className="price">Gratuit</span>
        ) : (
          <span className="price">{game.price}</span>
        )}
      </div>
    </div>
  );
};

// GameCarousel component
const GameCarousel: React.FC<GameCarouselProps> = ({ filters , category, games }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleGames, setVisibleGames] = useState(4);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateVisibleGames = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const gameCardWidth = 208; // 192px width + 16px gap
        const visibleCount = Math.floor(containerWidth / gameCardWidth);
        setVisibleGames(Math.min(visibleCount, games.length));
      }
    };

    updateVisibleGames();
    window.addEventListener("resize", updateVisibleGames);
    return () => window.removeEventListener("resize", updateVisibleGames);
  }, [games.length]);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current && canScrollLeft) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && canScrollRight) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const filteredGames = games.filter(game => {
    // Always filter by category first
    if (game.category !== category) return false;

    // If no filters applied (except category), show all games in this category
    if (!filters.query && 
        filters.category === "Category" && 
        !filters.dateSort && 
        filters.priceRange.min === 0 && 
        filters.priceRange.max === 100 && 
        !filters.priceSort && 
        !filters.device) {
      return true;
    }

    // Apply additional filters
    const matchesQuery = filters.query 
      ? game.title.toLowerCase().includes(filters.query.toLowerCase())
      : true;
    
    const matchesDevice = filters.device 
      ? game.supportedPlatforms.includes(filters.device)
      : true;

    const price = parseFloat(game.price.replace(/[^0-9,]/g, '').replace(',', '.'));
    const matchesPrice = price >= filters.priceRange.min && price <= filters.priceRange.max;

    return matchesQuery && matchesDevice && matchesPrice;
  });

  // Sort games based on filters
  const sortedGames = [...filteredGames];
  if (filters.dateSort) {
    sortedGames.sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();
      return filters.dateSort === "Newest to Oldest" ? dateB - dateA : dateA - dateB;
    });
  }
  if (filters.priceSort) {
    sortedGames.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9,]/g, '').replace(',', '.'));
      const priceB = parseFloat(b.price.replace(/[^0-9,]/g, '').replace(',', '.'));
      return filters.priceSort === "Low to High" ? priceA - priceB : priceB - priceA;
    });
  }

  // Only render if there are games to show
  if (sortedGames.length === 0) return null;

  return (
    <div className="carousel-container">
      <div className="carousel-content-container">
        <div className="carousel-header">
          <span className="carousel-title-div">
          <h2 className="carousel-title">
            {category}
          </h2>
          </span>
          <div className="navigation-buttons">
            <button
              onClick={scrollLeft}
              className={`nav-button ${!canScrollLeft ? "disabled" : ""}`}
              aria-label="Scroll left"
              disabled={!canScrollLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="arrow-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className={`nav-button ${!canScrollRight ? "disabled" : ""}`}
              aria-label="Scroll right"
              disabled={!canScrollRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="arrow-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="carousel-wrapper">
          <div ref={scrollContainerRef} className="games-container">
           {sortedGames.map((game) => (
          <div key={game.id} className="game-item">
            <GameCard game={game} />
          </div>
        ))}
          </div>
        </div>
      </div>

      <style>{`
        .carousel-container {
          width: 100%;
          display: flex;
          justify-content: center;
          background-color: #101014;
        }
        
        .carousel-content-container {
          width: 85%;
          max-width: 1200px;
          position: relative;
        }
        
        .carousel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
       .carousel-title-div {
        background-color:  #2D2D2D;
        padding: 8px 16px; 
        border-radius: 12px; 
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
        display: inline-flex; 
        align-items: center;
      }

      .carousel-title {
        color:rgb(255, 255, 255); 
        font-size: 15px; 
        font-weight: 600; 
        margin: 0; 
      }

        .title-text {
          margin-right: 4px;
        }

        .chevron-icon {
          height: 20px;
          width: 20px;
          flex-shrink: 0;
          margin-top: 2%;
        }
        
        .carousel-wrapper {
          position: relative;
        }
        
        .navigation-buttons {
          display: flex;
          gap: 8px;
        }
        
        .nav-button {
          background-color: #333;
          border: none;
          border-radius: 50%;
          padding: 4px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.2s ease;
        }
        
        .nav-button:hover:not(.disabled) {
          background-color: #444;
        }
        
        .nav-button.disabled {
          background-color: #262626;
          cursor: default;
          opacity: 0.5;
        }
        
        .arrow-icon {
          height: 24px;
          width: 24px;
        }
        
        .games-container {
          display: flex;
          overflow-x: auto;
          gap: 16px;
          padding-bottom: 16px;
          scrollbar-width: none;
        }
        
        .games-container::-webkit-scrollbar {
          display: none;
        }
        
        .game-item {
          flex-shrink: 0;
        }
        
        .game-card {
          width: 192px;
          display: flex;
          flex-direction: column;
        }
        
        .game-image-container {
          position: relative;
          height: 256px;
          width: 100%;
          margin-bottom: 8px;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .game-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        
        .release-date {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
          color: white;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .game-category {
          font-size: 12px;
          color: #a0a0a0;
          margin-bottom: 4px;
        }
        
        .platform-icons {
          display: flex;
          gap: 4px;
        }

        .platform-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
        }

        .game-title {
          font-weight: 500;
          color: white;
          margin-bottom: 8px;
        }
        
        .price-container {
          display: flex;
          align-items: center;
        }
        
        .discount-badge {
          background-color: #0066cc;
          color: white;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          margin-right: 8px;
        }
        
        .original-price {
          color: #a0a0a0;
          text-decoration: line-through;
          font-size: 13px;
          margin-right: 8px;
        }
        
        .price {
          font-size: 13px;
          color: white;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

interface GameCarouselProductsProps {
  filters: SearchFilters;
  games: Game[];
}
// Standalone GameCarouselProducts component
export default function GameCarouselProducts({ filters, games }: GameCarouselProductsProps) {
  return (
    <div style={{ minHeight: "100%", width: "100%" }}>
      <div style={{ marginTop: "40px", marginBottom: window.innerWidth > 477 ? "10px" : "20px" }}>
        <GameCarousel category="Action" games={games} filters={filters} />
        <GameCarousel category="RPG" games={games} filters={filters} />
        <GameCarousel category="Adventure" games={games} filters={filters} />
      </div>
    </div>
  );
}