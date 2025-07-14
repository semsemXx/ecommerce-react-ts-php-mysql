import React from 'react';

interface CartSummaryProps {
  subtotal: string;
  discount: string;
  total: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, discount, total }) => {
  return (
    <div className="summary-container">
      <h2 className="summary-title">Games and Apps Summary</h2>
      
      <div className="summary-details">
        <div className="summary-row">
          <span className="summary-label">Price</span>
          <span className="summary-value">${subtotal}</span>
        </div>
        
        <div className="summary-row">
          <span className="summary-label">Sale Discount</span>
          <span className="summary-discount">-${discount}</span>
        </div>
        
        <div className="summary-divider"></div>
        
        <div className="summary-row summary-total">
          <span className="summary-label">Subtotal</span>
          <span className="summary-value">${total}</span>
        </div>
      </div>
      
      <button className="summary-checkout-button">
        CHECK OUT
      </button>
      
      <style >{`
        .summary-container {
          background-color: #121212;
          padding: 1.5rem;
          border-radius: 0;
          height: fit-content;
          position: sticky;
          top: 20px;
        }
        
        .summary-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: white;
        }
        
        .summary-details {
          margin-bottom: 1.5rem;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }
        
        .summary-label {
          color: #e5e5e5;
        }
        
        .summary-value {
          font-weight: 500;
          color: white;
        }
        
        .summary-discount {
          font-weight: 500;
        }
        
        .summary-divider {
          border-top: 1px solid #2a2a2a;
          margin: 1rem 0;
        }
        
        .summary-total {
          font-weight: 700;
          font-size: 1rem;
        }
        
        .summary-total .summary-label,
        .summary-total .summary-value {
          font-weight: 700;
        }
        
        .summary-checkout-button {
          width: 100%;
          background-color: #0084ff;
          color: white;
          font-weight: 600;
          padding: 0.85rem 1rem;
          border-radius: 0;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        
        .summary-checkout-button:hover {
          background-color: #0070db;
        }
        
        @media (max-width: 768px) {
          .summary-container {
            margin-top: 1.5rem;
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CartSummary;