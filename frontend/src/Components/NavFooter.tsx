import React from 'react';
import Logo from '../Assets/Logos/logo.svg'

const NavFooter: React.FC = () => {
  return (
    <>
      <style>{`
        .nav-footer {
          background-color: #000;
          color: #fff;
          padding: 20px 40px;
          display: flex;
          font-weight : bold ;
          justify-content: center;
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }
        
        .logo a {
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          font-size: 20px;
        }
        
        .logo img {
          width: 120px; /* Increased logo size */
          height: auto;
        }
        
        .nav-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        
        .nav-links li {
          margin-bottom: 10px;
        }
        
        .nav-links a {
          color: #fff;
          text-decoration: none;
        }
        
        .support-section {
          display: flex;
          flex-direction: column;
        }
        
        .support-section p {
          margin: 0 0 5px 0;
        }
        
        .support-link {
          color: #fff;
          text-decoration: none;
        }
        
        .underline {
          text-decoration: underline;
        }
        
        .external-icon {
          font-size: 14px;
          }
        
        .social-icons {
          display: flex;
          gap: 25px;
        }
        
        .social-icon {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Media query for responsive design */
        @media (max-width: 768px) {

          .nav-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          
          .social-icons {
            align-self: flex-start;
          }
        .logo
        {
         margin-left : -15px;
        }
        }
      `}</style>
      <div className="nav-footer">
        <div className="nav-container">
          <div className="logo">
            <a href="/"><img src={Logo} alt="Logo" /></a>
          </div>
          <div className="nav-links">
            <ul>
              <li><a href="/games">Games</a></li>
              <li><a href="/about-us">About us</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="support-section">
            <p>Do you have a question?</p>
            <a href="/support" className="support-link">Go to <span className="underline">our support</span> <span className="external-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform:'translateY(4px)'}}>
                  <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span></a>
          </div>
          <div className="social-icons">
            <a href="#" className="social-icon twitter">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" fill="white"/>
              </svg>
            </a>
            <a href="#" className="social-icon facebook">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavFooter;