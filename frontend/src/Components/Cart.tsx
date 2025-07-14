import React, { useState } from 'react';
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

// Define a cart item type
interface CartItemType {
  id: number;
  title: string;
  coverImage: string;
  originalPrice: string;
  salePrice: string;
  discountPercentage: string;
  rating: string;
  ratingDetails: string[];
  platform: 'windows' | 'playstation' | 'xbox' | 'nintendo';
}

// Sample cart data (replace with your actual data source)
const initialCartItems: CartItemType[] = [
  {
    id: 1,
    title: "Red Dead Redemption 2",
    coverImage: "/images/red-dead.jpg",
    originalPrice: "$59.99",
    salePrice: "$29.99",
    discountPercentage: "50%",
    rating: "M",
    ratingDetails: ["Blood and Gore", "Intense Violence", "Nudity", "Sexual Content", "Strong Language", "Use of Drugs and Alcohol"],
    platform: "windows"
  },
  {
    id: 2,
    title: "Far Cry 6 Standard Edition",
    coverImage: "/images/farcry6.jpg",
    originalPrice: "$59.99",
    salePrice: "$23.99",   
    discountPercentage: "60%",
    rating: "M",
    ratingDetails: ["Blood and Gore", "Intense Violence", "Mild Sexual Themes", "Strong Language", "Use of Drugs and Alcohol"],
    platform: "windows"
  }
  // Add more items as needed
];

const Cart = () => {
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);
  
  // Calculate cart summary
  const cartSummary = {
    subtotal: "119.98",
    discount: "66.00",
    total: "53.98"
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
      <main className="cart-main">
        <h1 className="cart-title">My Cart</h1>
        
        <div className="cart-grid">
          <div className="cart-items-container">
            {cartItems.length > 0 ? 
              cartItems.map(item => (
                <CartItem 
                  key={item.id} 
                  {...item} 
                  onRemove={handleRemoveItem} 
                />
              )) : 
              <div className="cart-empty">
                <h3 className="cart-empty-title">Your cart is empty</h3>
                <p className="cart-empty-text">Browse our store to find amazing games!</p>
                <a href="#" className="cart-continue-shopping">
                  Continue Shopping
                </a>
              </div>
            }
          </div>
          
          <div className="cart-summary-container">
            <CartSummary 
              subtotal={cartSummary.subtotal}
              discount={cartSummary.discount}
              total={cartSummary.total} 
            />
          </div>
        </div>
      </main>
      <style >{`
        .cart-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #0a0a0a;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .cart-main {
          flex-grow: 1;
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 2rem;
          padding-right: 2rem;
          padding-top: 2rem;
          padding-bottom: 4rem;
          width: 100%;
        }
        
        .cart-title {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: white;
        }
        
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        .cart-items-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .cart-empty {
          background-color: rgba(0, 0, 0, 0.4);
          padding: 2rem;
          border-radius: 0;
          text-align: center;
        }
        
        .cart-empty-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .cart-empty-text {
          color: #9ca3af;
          margin-bottom: 1rem;
        }
        
        .cart-continue-shopping {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .cart-continue-shopping:hover {
          color: #60a5fa;
        }
        
        @media (min-width: 1024px) {
          .cart-grid {
            grid-template-columns: 2fr 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .cart-main {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .cart-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;