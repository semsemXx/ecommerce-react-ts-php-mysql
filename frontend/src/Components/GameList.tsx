import React from 'react';
import styles from '../Assets/css/GameList.module.css';

interface Game {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  category: string;
  imageUrl: string;
  free?: boolean;
}

interface GameListProps {
  games: Game[];
}

const GameList: React.FC<GameListProps & { title?: string }> = ({ games, title }) => {
    return (
      <div className={styles.gameListContainer}>
        <div className={styles.gameListHeader}>
          <h2>{title}</h2>
          <span className={styles.chevronRight}>›</span>
        </div>
  
        <div className={styles.gameList}>
          {games.map((game: Game) => (
            <div key={game.id} className={styles.gameItem}>
              <div className={styles.gameImageContainer}>
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className={styles.gameImage}
                />
                {game.free && (
                  <div className={styles.gameFreeBadge}>
                    Free
                  </div>
                )}
              </div>
              
              <div className={styles.gameDetails}>
                <h3 className={styles.gameTitle}>{game.title}</h3>
                
                <div className={styles.gamePriceInfo}>
                  {game.discount && (
                    <span className={styles.gameDiscountBadge}>
                      {game.discount}
                    </span>
                  )}
                  
                  {game.originalPrice && (
                    <span className={styles.gameOriginalPrice}>
                      {game.originalPrice}
                    </span>
                  )}
                  
                  <span className={styles.gamePrice}>
                    {game.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default GameList;