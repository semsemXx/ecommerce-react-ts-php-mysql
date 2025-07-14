import React from 'react';

const Copyright: React.FC = () => {
  return (
    <>
      <style>{`
        .copyright-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #ff0000;
          color: #fff;
          padding: 15px 40px;
        }
        
        .copyright-content {
          font-size: 14px;
          flex: 1;
        }
        
        .copyright-content p {
          margin: 0;
        }
        
        /* Media query for responsive design */
        @media (max-width: 768px) {
          .copyright-container {
            flex-direction: column;
            gap: 15px;
          }
          
          .copyright-content {
            text-align: center;
          }
        }
      `}</style>
      <div className="copyright-container">
        <div className="copyright-content">
          <p>© 2025 Prestewi. All rights reserved. All trademarks, logos, and game titles are the property of their respective owners. Unauthorized reproduction or distribution is prohibited.</p>
        </div>
      </div>
    </>
  );
};

export default Copyright;