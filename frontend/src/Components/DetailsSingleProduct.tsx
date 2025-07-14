import React, { useState, useEffect } from 'react';
export default function DetailsSingleProduct() {
  const [showMore, setShowMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Trigger initial animation after component mounts
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleShowMore = (e:any) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <div className="details-container">
      <span className="genres-label">Genres</span>
      <div className="genres">
        <span>Action-Adventure</span>
        <span>RPG</span>
      </div>
      <h1>ASSASSIN'S CREED SHADOWS</h1>
      <h2>ENTER FEUDAL JAPAN</h2>
      <p>
        Explore the captivating open world of feudal Japan, from spectacular castle towns and bustling ports to peaceful shrines and war-ravaged landscapes. Adventure through unpredictable weather, changing seasons, and reactive environments.
      </p>
      <h2>MASTER COMPLEMENTARY PLAYSTYLES</h2>
      <p>
        Become Naoe, a shinobi Assassin, and Yasuke, a legendary samurai, as you experience their riveting stories and master their complementary playstyles. As Naoe, use stealth to avoid detection and agility to confound your enemies. As Yasuke, strike your foes with lethal precision and power.
      </p>
      <div className="content-wrapper">
        <h2>MAKE INFORMATION YOUR WEAPON</h2>
        <div className="main-paragraph-wrapper">
          <p className={`main-paragraph ${!showMore ? 'partial' : 'full'}`}>
            Travel the world and build your own network of spies to be your eyes and ears across locations to hunt down your next target. Along the way, recruit new allies with unique abilities to help accomplish your missions.
          </p>
          <div className={`dark-overlay ${showMore ? 'hidden' : ''} ${isInitialLoad ? 'initial' : ''}`}></div>
        </div>
        <div className={`extra-content-wrapper ${showMore ? 'visible' : ''}`}>
          <p className="extra-content">
            But beware—trust is a fragile weapon. As you gather intelligence, you'll uncover whispers of betrayal and hidden enemies within your own ranks. In the shadows of feudal Japan, every alliance comes with a price, and the line between friend and foe blurs in the face of an ancient, malevolent force that seeks to consume all you hold dear.
          </p>
        </div>
      </div>

      <button className="show-more-btn" onClick={handleShowMore}>
        {showMore ? 'SHOW LESS' : 'SHOW MORE'}
      </button>

      <style>{`
        .details-container {
          color: #d3d3d3;
          padding: 20px;
          font-family: 'Arial', sans-serif;
          max-width: 800px;
          margin: 0 auto;
        }

        .genres-label {
          color: #a9a9a9;
          font-size: 14px;
          text-transform: uppercase;
          font-weight: bold;
          display: block;
          margin-bottom: 10px;
        }

        .genres {
          margin-bottom: 20px;
        }

        .genres span {
          background-color: #333;
          padding: 5px 10px;
          margin-right: 10px;
          border-radius: 5px;
          font-size: 14px;
          text-transform: uppercase;
          color: #d3d3d3;
          display: inline-block;
        }

        h1 {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #ffffff;
        }

        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 10px;
          text-transform: uppercase;
          color: #ffffff;
        }

        p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
          color: #d3d3d3;
          transition: all 0.5s ease-in-out;
        }

        .content-wrapper {
          position: relative;
          overflow: hidden;
        }

        .main-paragraph-wrapper {
          position: relative;
        }

        .main-paragraph {
          margin-bottom: 0;
          transition: all 0.5s ease-in-out;
        }

        .partial {
          max-height: 4.8em;
          overflow: hidden;
          opacity: 0.9;
        }

        .full {
          max-height: none;
          opacity: 1;
        }

        .dark-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background: linear-gradient(to top, #101014 40%, transparent 100%);
          transform: translateY(100%);
          animation: slideUp 0.5s ease-out forwards;
          pointer-events: none;
        }

        .dark-overlay.initial {
          transform: translateY(100%);
          animation: slideUp 0.5s ease-out forwards 0.2s;
        }

        .dark-overlay.hidden {
          transform: translateY(100%);
          animation: slideDown 0.5s ease-in forwards;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }

        .extra-content-wrapper {
          max-height: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease-in-out;
        }

        .extra-content-wrapper.visible {
          max-height: 500px;
          opacity: 1;
          transform: translateY(0);
        }

        .extra-content {
          color: #b0b0b0;
          margin-top: 15px;
          margin-bottom: 0;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .show-more-btn {
          color: #1e90ff;
          background: none;
          border: none;
          padding: 0;
          font-size: 16px;
          text-transform: uppercase;
          font-weight: bold;
          cursor: pointer;
          margin-top: 20px;
          transition: color 0.3s ease;
        }

        .show-more-btn:hover {
          text-decoration: underline;
          color: #63b1ff;
        }
      `}</style>
    </div>
  );
}