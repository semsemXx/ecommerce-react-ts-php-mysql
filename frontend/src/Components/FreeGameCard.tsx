import React from "react";
import { Gift } from "lucide-react";

interface FreeGame {
  id: string;
  title: string;
  imageUrl: string;
  endDate: string;
  type: "free" | "mystery";
}

interface FreeGamesSectionProps {
  games: FreeGame[];
}

const FreeGameCard: React.FC<{ game: FreeGame }> = ({ game }) => {
  return (
    <div className="free-game-card">
      <div className="free-game-image-container">
        <img src={game.imageUrl} alt={game.title} className="free-game-image" />
        <div className="free-game-tag">
          {game.type === "free" ? "GRATUIT" : "JEU MYSTÈRE"}
        </div>
      </div>
      <div className="free-game-title">{game.title}</div>
      <div className="free-game-date">
        {game.type === "mystery" 
          ? `Déverrouillage dans ${game.endDate}`
          : `Gratuit jusqu'au ${game.endDate}`
        }
      </div>
    </div>
  );
};

const FreeGamesSection: React.FC<FreeGamesSectionProps> = ({ games }) => {
  return (
    <div className="free-games-wrapper" style={{marginTop:'-110px'}}>
      <div className="free-games-container">
        <div className="free-games-content">
          <div className="free-games-header">
            <div className="free-games-title">
              <Gift size={24} />
              <span>Jeux gratuits</span>
            </div>
            <button className="view-more-button">Voir plus</button>
          </div>
          
          <div className="free-games-grid">
            {games.map((game) => (
              <FreeGameCard key={game.id} game={game} />
            ))}
          </div>
        </div>

        <style>{`
          .free-games-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0;
            }
          
          .free-games-container {
            width: 100%;
            max-width: 1200px;
            display: flex;
            justify-content: center;
            background-color: #202024;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            transform : translateY(-20px)
          }
          
          .free-games-content {
            width: 100%;
          }
          
          .free-games-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }
          
          .free-games-title {
            display: flex;
            align-items: center;
            gap: 12px;
            color: white;
            font-size: 20px;
            font-weight: 500;
          }
          
          .view-more-button {
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          
          .view-more-button:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
          
          .free-games-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          
          .free-game-card {
            position: relative;
            color: white;
          }
          
          .free-game-image-container {
            position: relative;
            height: 240px;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 12px;
          }
          
          .free-game-tag {
            position: absolute;
            bottom: 12px;
            left: 12px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 12px;
            font-weight: 500;
            padding: 6px 10px;
            border-radius: 4px;
            z-index: 2;
          }
          
          .free-game-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
            z-index: 0;
            transition: transform 0.3s ease;
          }
          
          .free-game-card:hover .free-game-image {
            transform: scale(1.05);
          }
          
          .free-game-title {
            font-weight: 500;
            font-size: 16px;
            margin-bottom: 6px;
          }
          
          .free-game-date {
            font-size: 13px;
            color: #a0a0a0;
          }
          
          /* Responsive styles */
          @media (max-width: 1024px) {
            .free-games-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .free-games-container {
              width: 95%;
              margin: 0 auto;
            }
          }
          
          @media (max-width: 768px) {
            .free-games-container {
              padding: 16px;
              width: 90%;
            }
            
            .free-game-image-container {
              height: 200px;
            }
          }
          
          @media (max-width: 576px) {
            .free-games-grid {
              grid-template-columns: 1fr;
            }
            
            .free-games-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
            
            .view-more-button {
              align-self: flex-end;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FreeGamesSection;