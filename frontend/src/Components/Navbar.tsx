import React, { useState, useEffect, useRef } from 'react';
import Logo from '../Assets/Logos/logo.svg';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  onAuthChange: (type: 'login' | 'signup') => void;
  onUserChange: (status: 'loggedIn' | null) => void; // Renamed for consistency
}

const NavBar: React.FC<NavBarProps> = ({ onAuthChange, onUserChange }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showLoginTooltip, setShowLoginTooltip] = useState<boolean>(false);
  const [showSignupTooltip, setShowSignupTooltip] = useState<boolean>(false);
  const [showSearchTooltip, setShowSearchTooltip] = useState<boolean>(false);
  const [showCartTooltip, setShowCartTooltip] = useState<boolean>(false);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [scrollState, setScrollState] = useState({
    isTop: true,
    isScrollingUp: false,
    lastScroll: 0
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [user, setUser] = useState<'loggedIn' | null>(null); // Local user state

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isTop = currentScroll <= 80;
      
      setScrollState(prev => ({
        isTop,
        isScrollingUp: currentScroll < prev.lastScroll && currentScroll > 0,
        lastScroll: currentScroll
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu cleanup
  useEffect(() => {
    if (!isMobile) {
      setShowMobileMenu(false);
    }
  }, [isMobile]);

  // Search input focus
  useEffect(() => {
    if (showSearchInput && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchInput]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSearchInput && 
          searchInputRef.current && 
          !searchInputRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('[data-search-button]')) {
        setShowSearchInput(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchInput]);

  const handleLoginClick = () => {
    onAuthChange('login');
    setUser('loggedIn'); // Update local state
    onUserChange('loggedIn'); // Notify parent component
    navigate('/login'); // Changed to lowercase for consistency
  };

  const handleSignupClick = () => {
    onAuthChange('signup');
    navigate('/login'); // Changed to lowercase for consistency
  };

  const handleLogoutClick = () => {
    setUser(null);
    onUserChange(null);
    navigate('/');
  };

  const categories = ['cat 1', 'cat 2', 'cat 3', 'cat 4', 'cat 5', 'cat 6', 'cat 7', 'cat 8', 'cat 9', 'cat 10'];

  return (
    <>
      {/* Mobile menu overlay */}
      {showMobileMenu && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 15,
            transition: 'opacity 0.3s ease',
          }}
          onClick={() => setShowMobileMenu(false)}
        />
      )}
      
      {/* Mobile menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '280px',
        maxWidth: '80vw',
        background: '#121216',
        zIndex: 20,
        transform: showMobileMenu ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        {/* Mobile menu header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '15px',
          borderBottom: '1px solid #333'
        }}>
          <img style={{ margin: 0}} src={Logo} alt="Prestawi" />
          <button 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '5px'
            }}
            onClick={() => setShowMobileMenu(false)}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Mobile menu content */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{
            color: 'white',
            borderBottom: '1px solid #333',
            paddingBottom: '10px',
            marginTop: 0
          }}>STORE</h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '15px'
          }}>
            <h4 style={{ color: 'white', margin: '5px 0' }}>CATEGORIES</h4>
            {categories.map((category, index) => (
              <div 
                key={index}
                style={{ 
                  color: '#888', 
                  cursor: 'pointer',
                  padding: '8px 5px',
                  transition: 'color 0.2s ease, background 0.2s ease',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                onClick={() => navigate('/products')} // Updated navigation
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile auth buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginTop: '30px'
        }}>
          {!user ? (
            <>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  gap: '15px'
                }}
                onClick={handleLoginClick}
              >
                <svg 
                  width="22" 
                  height="22" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Log in</span>
              </div>
              
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  gap: '15px'
                }}
                onClick={handleSignupClick}
              >
                <svg 
                  width="22" 
                  height="22" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                <span>Sign up</span>
              </div>
            </>
          ) : (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                padding: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                gap: '15px'
              }}
              onClick={handleLogoutClick}
            >
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Log out</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Desktop navbar */}
      <div 
        ref={navRef}
        style={{
          background: '#121216',
          height: scrollState.isTop || scrollState.isScrollingUp || isHovered ? '10vh' : '50px',
          maxHeight: '70px',
          color: 'white',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          boxSizing: 'border-box',
          overflow: 'visible',
          justifyContent: 'space-between',
          zIndex: 11,
          transition: 'all 0.3s ease',
          opacity: scrollState.isTop || scrollState.isScrollingUp || isHovered ? 1 : 0.7,
          boxShadow: scrollState.isTop ? 'none' : '0 2px 10px rgba(0,0,0,0.2)',
          backdropFilter: scrollState.isTop ? 'none' : 'blur(10px)',
          WebkitBackdropFilter: scrollState.isTop ? 'none' : 'blur(10px)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          opacity: scrollState.isTop || scrollState.isScrollingUp || isHovered ? 1 : 1,
          transition: 'opacity 0.3s ease'
        }}>
          {isMobile && (
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px',
                marginRight: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '24px',
                opacity: scrollState.isTop || scrollState.isScrollingUp || isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onClick={() => setShowMobileMenu(true)}
            >
              <span style={{ 
                height: '2px', 
                width: '24px', 
                background: 'white', 
                display: 'block',
                transition: 'transform 0.2s ease'
              }}></span>
              <span style={{ 
                height: '2px', 
                width: '24px', 
                background: 'white', 
                display: 'block',
                transition: 'opacity 0.2s ease'
              }}></span>
              <span style={{ 
                height: '2px', 
                width: '24px', 
                background: 'white', 
                display: 'block',
                transition: 'transform 0.2s ease'
              }}></span>
            </button>
          )}
          
          <img 
            style={{ 
              margin: 0, 
              marginTop: '3%',
              opacity: 1,
              transition: 'none'
            }} 
            src={Logo} 
            alt="Prestawi" 
          />

          {!isMobile && (
            <div 
              style={{
                position: 'relative',
                display: 'inline-block',
                opacity: scrollState.isTop || scrollState.isScrollingUp || isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px',
              }}>
                <span style={{ 
                  marginRight: '5px',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>STORE</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: '#1e1e24',
                borderRadius: '8px',
                width: '300px',
                padding: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                zIndex: 10,
                opacity: showDropdown ? 1 : 0,
                visibility: showDropdown ? 'visible' : 'hidden',
                transform: showDropdown ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                pointerEvents: showDropdown ? 'auto' : 'none'
              }}>
                <h3 style={{
                  borderBottom: '1px solid #333',
                  paddingBottom: '10px',
                  marginTop: 0
                }}>CATEGORIES</h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginTop: '15px',
                }}>
                  {categories.map((category, index) => (
                    <div 
                      key={index}
                      style={{ 
                        color: '#888', 
                        cursor: 'pointer',
                        padding: '5px',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                      onClick={() => navigate('/products')}
                    >
                      {category}
                    </div>
                  ))}
                  <button 
                    className="view-more-button" 
                    style={{ transform: 'translate(30%, 10%)' }}
                    onClick={() => navigate('/products')}
                  >
                    View All Games
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          position: 'relative',
          opacity: scrollState.isTop || scrollState.isScrollingUp || isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{
              position: 'absolute',
              right: '0',
              display: 'flex',
              alignItems: 'center',
              width: showSearchInput ? '240px' : '0',
              overflow: 'hidden',
              transition: 'width 0.3s ease',
              backgroundColor: '#1e1e24',
              borderRadius: '20px',
              marginRight: showSearchInput ? '40px' : '0'
            }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'white',
                  padding: '8px 15px',
                  width: '100%',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <button 
                data-search-button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  zIndex: 2
                }}
                onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  setShowSearchTooltip(true);
                }}
                onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  setShowSearchTooltip(false);
                }}
                onClick={() => setShowSearchInput(!showSearchInput)}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '50%',
                transform: `translateX(-50%) translateY(${showSearchTooltip ? '0' : '-10px'})`,
                background: '#333',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                opacity: showSearchTooltip ? 1 : 0,
                visibility: showSearchTooltip ? 'visible' : 'hidden',
                transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
                zIndex: 5
              }}>
                Search
              </div>
            </div>
          </div>
          
          {/* Cart */}
          <div style={{ position: 'relative' }}>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              setShowCartTooltip(true);
            }}
            onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = 'scale(1)';
              setShowCartTooltip(false);
            }}
            >
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
            
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: `translateX(-50%) translateY(${showCartTooltip ? '0' : '-10px'})`,
              background: '#333',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              opacity: showCartTooltip ? 1 : 0,
              visibility: showCartTooltip ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
              zIndex: 5
            }}>
              Cart
            </div>
          </div>
          
          {/* Desktop auth buttons */}
          {!isMobile && (
            <>
              {!user ? (
                <>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        setShowLoginTooltip(true);
                      }}
                      onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        setShowLoginTooltip(false);
                      }}
                      onClick={handleLoginClick}
                    >
                      <svg 
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </button>
                    
                    <div style={{
                      position: 'absolute',
                      bottom: '-30px',
                      left: '50%',
                      transform: `translateX(-50%) translateY(${showLoginTooltip ? '0' : '-10px'})`,
                      background: '#333',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      opacity: showLoginTooltip ? 1 : 0,
                      visibility: showLoginTooltip ? 'visible' : 'hidden',
                      transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
                      zIndex: 5
                    }}>
                      Log in
                    </div>
                  </div>
                  
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        setShowSignupTooltip(true);
                      }}
                      onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        setShowSignupTooltip(false);
                      }}
                      onClick={handleSignupClick}
                    >
                      <svg 
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                    </button>
                    
                    <div style={{
                      position: 'absolute',
                      bottom: '-30px',
                      left: '50%',
                      transform: `translateX(-50%) translateY(${showSignupTooltip ? '0' : '-10px'})`,
                      background: '#333',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      opacity: showSignupTooltip ? 1 : 0,
                      visibility: showSignupTooltip ? 'visible' : 'hidden',
                      transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
                      zIndex: 5
                    }}>
                      Sign up
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button 
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      setShowLoginTooltip(true);
                    }}
                    onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      setShowLoginTooltip(false);
                    }}
                    onClick={handleLogoutClick}
                  >
                    <svg 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </button>
                  
                  <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '50%',
                    transform: `translateX(-50%) translateY(${showLoginTooltip ? '0' : '-10px'})`,
                    background: '#333',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    opacity: showLoginTooltip ? 1 : 0,
                    visibility: showLoginTooltip ? 'visible' : 'hidden',
                    transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
                    zIndex: 5
                  }}>
                    Log out
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;