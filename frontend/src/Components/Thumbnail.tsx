import React, { useState, useEffect, useRef } from 'react';
import BackgroundImage from '../Assets/Images/image-6.png';
import VideoAssasinsCreed from '../Assets/Videos/AssasinsCreed.mp4';

// Define the interface for thumbnail items
interface ThumbnailItem {
  id: string;
  title: string;
  videoUrl?: string;
  imageUrl?: string;
  thumbnail?: string;
}

// Define props interface
interface ThumbnailProps {
  game?: any; // You might want to specify a more specific type for game
}

const thumbnailContent: ThumbnailItem[] = [
  { id: '1', videoUrl: VideoAssasinsCreed, title: 'Assassin\'s Creed', thumbnail: BackgroundImage },
  { id: '2', imageUrl: BackgroundImage, title: 'Thumbnail 2' },
  { id: '3', imageUrl: BackgroundImage, title: 'Thumbnail 3' },
  { id: '4', imageUrl: BackgroundImage, title: 'Thumbnail 4' },
  { id: '5', imageUrl: BackgroundImage, title: 'Thumbnail 5' },
  { id: '6', imageUrl: BackgroundImage, title: 'Thumbnail 6' },
  { id: '7', imageUrl: BackgroundImage, title: 'Thumbnail 7' },
  { id: '8', imageUrl: BackgroundImage, title: 'Thumbnail 8' },
  { id: '9', imageUrl: BackgroundImage, title: 'Thumbnail 9' },
  { id: '10', imageUrl: BackgroundImage, title: 'Thumbnail 10' },
  { id: '11', imageUrl: BackgroundImage, title: 'Thumbnail 11' },
  { id: '12', imageUrl: BackgroundImage, title: 'Thumbnail 12' },
];

export default function Thumbnail({ game }: ThumbnailProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ThumbnailItem>(thumbnailContent[0]);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  const scrollLeft = (): void => {
    if (scrollContainerRef.current && canScrollLeft) {
      scrollContainerRef.current.scrollBy({ 
        left: -110,
        behavior: 'smooth' 
      });
    }
  };

  const scrollRight = (): void => {
    if (scrollContainerRef.current && canScrollRight) {
      scrollContainerRef.current.scrollBy({ 
        left: 110,
        behavior: 'smooth' 
      });
    }
  };

  const handleItemClick = (item: ThumbnailItem): void => {
    setSelectedItem(item);
  };

  return (
    <div className="thumbnail-container">
      <div className="main-media">
        {selectedItem.videoUrl ? (
          <video 
            src={selectedItem.videoUrl} 
            autoPlay
            loop
            muted
            controls 
            className="main-video"
          />
        ) : (
          <img 
            src={selectedItem.imageUrl} 
            alt={selectedItem.title} 
            className="main-image"
          />
        )}
      </div>

      <div className="carousel-wrapper">
        <button
          onClick={scrollLeft}
          className={`nav-button-left ${!canScrollLeft ? 'disabled' : ''}`}
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

        <div ref={scrollContainerRef} className="thumbnail-carousel">
          {thumbnailContent.map((thumbnail) => (
            <div 
              key={thumbnail.id} 
              className={`thumbnail-item ${thumbnail.videoUrl ? 'video-item' : ''}`}
              onClick={() => handleItemClick(thumbnail)}
            >
              <img
                src={thumbnail.thumbnail || thumbnail.imageUrl}
                alt={thumbnail.title}
                className="thumbnail-image"
              />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className={`nav-button-right ${!canScrollRight ? 'disabled' : ''}`}
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

      <style>{`
        .thumbnail-container {
          padding: 20px;
          color: white;
          min-height: 100vh;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 55vw;
        }

        .main-media {
          background-color: rgb(0, 0, 0);
          height: 460px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          overflow: hidden;
        }

        .main-video, .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: -20px;
        }

        .thumbnail-carousel {
          display: flex;
          overflow-x: scroll;
          scroll-behavior: smooth;
          gap: 10px;
          padding: 10px 10px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          width: 430px;
        }

        .thumbnail-carousel::-webkit-scrollbar {
          display: none;
        }

        .thumbnail-item {
          flex: 0 0 auto;
          width: 100px;
          height: 50px;
          background-color:rgb(33, 33, 33);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .video-item {
          border: 2px solid red;
        }

        .thumbnail-item:hover {
          transform: scale(1.05);
        }

        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-button-left, .nav-button-right {
          background-color: #333;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
          flex-shrink: 0;
          position: absolute;
        }

        .nav-button-left {
          left: 10px;
        }

        .nav-button-right {
          right: 10px;  
        }

        .nav-button-left:hover:not(.disabled), .nav-button-right:hover caught:not(.disabled) {
          background-color: #555;
        }

        .nav-button-left.disabled, .nav-button-right.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .arrow-icon {
          width: 24px;
          height: 24px;
          color: white;
        }
      `}</style>
    </div>
  );
}