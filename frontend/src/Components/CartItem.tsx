import React from 'react';

interface CartItemProps {
  id: number;
  title: string;
  coverImage: string;
  originalPrice: string;
  salePrice: string;
  discountPercentage: string;
  rating: string;
  ratingDetails: string[];
  platform: 'windows' | 'playstation' | 'xbox' | 'nintendo';
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  coverImage,
  originalPrice,
  salePrice,
  discountPercentage,
  rating,
  ratingDetails,
  platform,
  onRemove
}) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img src={coverImage} alt={title} className="cart-item-image" />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        
        <div className="cart-item-rating">
          <div className="cart-item-esrb">
            <img src="/api/placeholder/24/24" alt="ESRB Rating" className="cart-item-esrb-icon" />
            <span className="cart-item-esrb-rating">{rating}</span>
          </div>
          <div className="cart-item-rating-details">
            {ratingDetails.map((detail, index) => (
              <span key={index} className="cart-item-rating-detail">
                {detail}{index < ratingDetails.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
        
        <div className="cart-item-platform">
          <img 
            src="/api/placeholder/16/16" 
            alt={platform} 
            className="cart-item-platform-icon" 
          />
        </div>
        
        <div className="cart-item-actions">
          <button 
            className="cart-item-remove-button" 
            onClick={() => onRemove(id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="cart-item-price">
        <div className="cart-item-discount">
          -{discountPercentage}
        </div>
        <div className="cart-item-price-details">
          <div className="cart-item-original-price">{originalPrice}</div>
          <div className="cart-item-sale-price">{salePrice}</div>
        </div>
      </div>
      <style>{`
        .cart-item {
          display: flex;
          margin-bottom: 1rem;
          padding: 1.5rem;
          background-color: #202020;
          border-radius: 0;
          position: relative;
        }
        
        .cart-item-image-container {
          flex-shrink: 0;
          width: 6rem;
          height: 8rem;
        }
        
        .cart-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .cart-item-details {
          flex-grow: 1;
          margin-left: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .cart-item-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .cart-item-rating {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.5rem;
        }
        
        .cart-item-esrb {
          display: flex;
          align-items: center;
          background-color: transparent;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
        }
        
        .cart-item-esrb-icon {
          height: 1.5rem;
          width: 1.5rem;
          margin-right: 0.25rem;
        }
        
        .cart-item-esrb-rating {
          font-weight: 600;
          color: #e5e5e5;
        }
        
        .cart-item-rating-details {
          font-size: 0.7rem;
          color: #888;
          line-height: 1.2;
        }

        .cart-item-rating-detail {
          color: #888;
        }
        
        .cart-item-platform {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
        }
        
        .cart-item-platform-icon {
          width: 1rem;
          height: 1rem;
        }
        
        .cart-item-actions {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
        }
        
        .cart-item-remove-button {
          color: #9ca3af;
          font-size: 0.875rem;
          padding: 0;
          background-color: transparent;
          border: none;
          cursor: pointer;
          right: 1.5rem;
          bottom: 0.5rem;
          position: absolute;
        }
        
        .cart-item-remove-button:hover {
          color: white;
          text-decoration: underline;
        }
        
        .cart-item-price {
          margin-left: auto;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          padding-left: 1.5rem;
        }
        
        .cart-item-discount {
          background-color: #0084ff;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 0;
          display: inline-block;
          margin-bottom: 0.75rem;
        }
        
        .cart-item-price-details {
          text-align: right;
        }
        
        .cart-item-original-price {
          color: #888;
          text-decoration: line-through;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }
        
        .cart-item-sale-price {
          color: white;
          font-weight: 700;
          font-size: 1.125rem;
        }
        
        @media (max-width: 768px) {
          .cart-item {
            flex-direction: column;
            padding: 1rem;
          }
          
          .cart-item-image-container {
            width: 100%;
            height: auto;
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
          }
          
          .cart-item-image {
            width: auto;
            max-width: 100%;
            height: 10rem;
          }
          
          .cart-item-details {
            margin-left: 0;
          }
          
          .cart-item-price {
            margin-left: 0;
            margin-top: 1rem;
            width: 100%;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding-left: 0;
          }
          
          .cart-item-discount {
            margin-bottom: 0.5rem;
          }
          
          .cart-item-price-details {
            text-align: left;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1023px) {
          .cart-item {
            padding: 1.25rem;
          }
          
          .cart-item-image-container {
            width: 5rem;
            height: 7rem;
          }
          
          .cart-item-details {
            margin-left: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItem;