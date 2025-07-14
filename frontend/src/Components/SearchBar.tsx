import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  games: Game[]; // Used for autocomplete suggestions
  placeholder?: string;
  categories?: string[];
  showFilters?: boolean;
}

interface Game {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  category: string;
  imageUrl: string;
  free?: boolean;
  supportedPlatforms: string[];
  releaseDate: Date;
}

export interface SearchFilters {
  query: string;
  category: string;
  dateSort: string;
  priceRange: {
    min: number;
    max: number;
  };
  priceSort: string;
  device: string;
}

// Device icons remain unchanged
const DeviceIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'PlayStation':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor" strokeWidth="1">
          <path d="M22.584 17.011c-.43.543-1.482.93-1.482.93l-7.833 2.817V18.68l5.764-2.057c.655-.234.755-.566.223-.74-.53-.175-1.491-.125-2.146.111l-3.84 1.354v-2.155l.22-.075s1.11-.394 2.671-.567c1.56-.172 3.472.024 4.972.593 1.69.535 1.88 1.323 1.451 1.866zm-8.57-3.537V8.162c0-.624-.114-1.198-.699-1.36-.447-.144-.725.272-.725.895V21l-3.584-1.139V4c1.524.283 3.744.953 4.937 1.355 3.035 1.043 4.064 2.342 4.064 5.267 0 2.851-1.758 3.932-3.992 2.852zm-11.583 4.99c-1.735-.49-2.024-1.51-1.233-2.097.731-.542 1.974-.95 1.974-.95l5.138-1.83v2.086l-3.697 1.325c-.653.234-.754.566-.223.74.531.175 1.493.125 2.147-.11l1.773-.644v1.865l-.353.06c-1.774.29-3.664.169-5.526-.445z"></path>
        </svg>
      );
    case 'Windows':
      return (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="#ffffff" stroke="currentColor" strokeWidth="1">
          <path d="M1,15H12a1,1,0,0,0,1-1V4.17a1,1,0,0,0-.35-.77,1,1,0,0,0-.81-.22L.84,5A1,1,0,0,0,0,6v8A1,1,0,0,0,1,15ZM2,6.85l9-1.5V13H2Z"></path>
          <path d="M30.84,0l-15,2.5a1,1,0,0,0-.84,1V14a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V1a1,1,0,0,0-.35-.76A1,1,0,0,0,30.84,0ZM30,13H17V4.35L30,2.18Z"></path>
          <path d="M.84,27l11,1.83H12a1,1,0,0,0,1-1V18a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v8A1,1,0,0,0,.84,27ZM2,19h9v7.65l-9-1.5Z"></path>
          <path d="M31,17H16a1,1,0,0,0-1,1V28.5a1,1,0,0,0,.84,1l15,2.5H31a1,1,0,0,0,.65-.24A1,1,0,0,0,32,31V18A1,1,0,0,0,31,17ZM30,29.82,17,27.65V19H30Z"></path>
        </svg>
      );
    case 'Xbox':
      return (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="#ffffff" stroke="currentColor" strokeWidth="1">
          <path d="M16 5.425c-1.888-1.125-4.106-1.922-6.473-2.249l-0.092-0.010c-0.070-0.005-0.152-0.008-0.234-0.008-0.613 0-1.188 0.16-1.687 0.441l0.017-0.009c2.357-1.634 5.277-2.61 8.426-2.61 0.008 0 0.016 0 0.024 0h0.019c0.005 0 0.011 0 0.018 0 3.157 0 6.086 0.976 8.501 2.642l-0.050-0.033c-0.478-0.272-1.051-0.433-1.662-0.433-0.085 0-0.169 0.003-0.252 0.009l0.011-0.001c-2.459 0.336-4.677 1.13-6.648 2.297l0.082-0.045zM5.554 5.268c-0.041 0.014-0.077 0.032-0.11 0.054l0.002-0.001c-2.758 2.723-4.466 6.504-4.466 10.684 0 3.584 1.256 6.875 3.353 9.457l-0.022-0.028c-1.754-3.261 4.48-12.455 7.61-16.159-3.53-3.521-5.277-4.062-6.015-4.062-0.010-0-0.021-0.001-0.032-0.001-0.115 0-0.225 0.021-0.326 0.060l0.006-0.002zM20.083 9.275c3.129 3.706 9.367 12.908 7.605 16.161 2.075-2.554 3.332-5.845 3.332-9.43 0-4.181-1.709-7.962-4.467-10.684l-0.002-0.002c-0.029-0.021-0.063-0.039-0.1-0.052l-0.003-0.001c-0.1-0.036-0.216-0.056-0.336-0.056-0.005 0-0.011 0-0.016 0h0.001c-0.741-0-2.485 0.543-6.014 4.063zM6.114 27.306c2.627 2.306 6.093 3.714 9.888 3.714s7.261-1.407 9.905-3.728l-0.017 0.015c2.349-2.393-5.402-10.901-9.89-14.29-4.483 3.39-12.24 11.897-9.886 14.29z"></path>
        </svg>
      );
    case 'VR':
      return (
        <div style={{ transform: 'translate(12px, 12px)' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#ffffff" stroke="currentColor" strokeWidth="1">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 2H16V14H10.5L9 11H7L5.5 14H0V2ZM6 7C6 8.10457 5.10457 9 4 9C2.89543 9 2 8.10457 2 7C2 5.89543 2.89543 5 4 5C5.10457 5 6 5.89543 6 7ZM12 9C13.1046 9 14 8.10457 14 7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7C10 8.10457 10.8954 9 12 9Z" fill="#ffffff"></path>
          </svg>
        </div>
      );
    case 'Nintendo':
      return (
        <svg width="22" height="22" viewBox="0 0 32 32" fill="#ffffff" stroke="currentColor" strokeWidth="1">
          <svg fill="#ffffff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <path d="M18.901 32h4.901c4.5 0 8.198-3.698 8.198-8.198v-15.604c0-4.5-3.698-8.198-8.198-8.198h-5c-0.099 0-0.203 0.099-0.203 0.198v31.604c0 0.099 0.099 0.198 0.302 0.198zM25 14.401c1.802 0 3.198 1.5 3.198 3.198 0 1.802-1.5 3.198-3.198 3.198-1.802 0-3.198-1.396-3.198-3.198-0.104-1.797 1.396-3.198 3.198-3.198zM15.198 0h-7c-4.5 0-8.198 3.698-8.198 8.198v15.604c0 4.5 3.698 8.198 8.198 8.198h7c0.099 0 0.203-0.099 0.203-0.198v-31.604c0-0.099-0.099-0.198-0.203-0.198zM12.901 29.401h-4.703c-3.099 0-5.599-2.5-5.599-5.599v-15.604c0-3.099 2.5-5.599 5.599-5.599h4.604zM5 9.599c0 1.698 1.302 3 3 3s3-1.302 3-3c0-1.698-1.302-3-3-3s-3 1.302-3 3z"></path>
          </svg>
        </svg>
      );
    default:
      return null;
  }
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch = () => {},
  games = [],
  placeholder = "Look for a game",
  categories = ["Category", "Action", "Adventure", "RPG", "Strategy", "Sports"],
  showFilters = true,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("Price");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedDevice, setSelectedDevice] = useState<string>("Device");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [showPriceRange, setShowPriceRange] = useState<boolean>(false);
  
  // New states for autocomplete functionality
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  // New state to track all filters
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: categories[0],
    dateSort: "",
    priceRange: {
      min: 0,
      max: 100
    },
    priceSort: "",
    device: "Device"
  });

  const devices = ["PlayStation", "Windows", "Xbox", "VR", "Nintendo"];
  const priceOptions = ["max-min", "Low to High", "High to Low"];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const MAX_PRICE = 100;

  // Update filters whenever individual filter states change
  useEffect(() => {
    setFilters({
      query: searchQuery,
      category: selectedCategory,
      dateSort: selectedDate,
      priceRange: {
        min: minPrice,
        max: maxPrice
      },
      priceSort: selectedPrice !== "Price" && !selectedPrice.includes('$') ? selectedPrice : "",
      device: selectedDevice !== "Device" ? selectedDevice : ""
    });
  }, [searchQuery, selectedCategory, selectedDate, selectedPrice, minPrice, maxPrice, selectedDevice]);

  // Generate suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const matchedGames = games
      .filter(game => game.title.toLowerCase().includes(query))
      .slice(0, 5); // Limit to 5 suggestions
      
    setSuggestions(matchedGames);
  }, [searchQuery, games]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current && 
        !wrapperRef.current.contains(event.target as Node) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Reset price range visibility when dropdown closes
    if (activeDropdown !== 'price') {
      setShowPriceRange(false);
    }
  }, [activeDropdown]);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
    setShowSuggestions(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim() !== '');
  };

  const handleSearchInputFocus = () => {
    setIsFocused(true);
    if (searchQuery.trim() !== '') {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (game: Game) => {
    setSearchQuery(game.title);
    setShowSuggestions(false);
    
    // Update filters with the selected game and apply search
    const updatedFilters = {
      ...filters,
      query: game.title
    };
    
    setFilters(updatedFilters);
    onSearch(updatedFilters);
    
    // Focus back on input after selection
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveDropdown(null);
  };

  const handleDateSort = (sortType: string) => {
    setSelectedDate(sortType);
    setActiveDropdown(null);
  };

  const handleDatePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setActiveDropdown(null);
  };

  const handlePriceSort = (sortType: string) => {
    setSelectedPrice(sortType);
    setActiveDropdown(null);
  };

  const togglePriceRange = () => {
    setShowPriceRange(!showPriceRange);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value >= 0 ? value : 0);
    setSelectedPrice(`$${value} - $${maxPrice}`);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value <= MAX_PRICE ? value : MAX_PRICE);
    setSelectedPrice(`$${minPrice} - $${value}`);
  };

  const handleDeviceSelect = (device: string) => {
    setSelectedDevice(device);
    setActiveDropdown(null);
  };

  // Implement reset filters function
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(categories[0]);
    setSelectedDate("");
    setSelectedPrice("Price");
    setMinPrice(0);
    setMaxPrice(100);
    setSelectedDevice("Device");
    setFilters({
      query: "",
      category: categories[0],
      dateSort: "",
      priceRange: {
        min: 0,
        max: 100
      },
      priceSort: "",
      device: ""
    });
    
    // Apply the reset filters
    onSearch({
      query: "",
      category: categories[0],
      dateSort: "",
      priceRange: {
        min: 0,
        max: 100
      },
      priceSort: "",
      device: ""
    });
  };

  const applyFilters = () => {
    onSearch(filters);
    setShowSuggestions(false);
  };

  // Function to highlight matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? 
        <span key={i} className="highlight">{part}</span> : 
        <span key={i}>{part}</span>
    );
  };

  return (
    <div className="search-bar-container" ref={wrapperRef}>
      <div className="search-bar-main">
        <form onSubmit={handleSearch} className="search-form">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={handleSearchInputFocus}
            placeholder={placeholder}
            className="search-input"
            aria-label="Search games"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown" ref={suggestionsRef}>
              {suggestions.map((game) => (
                <div 
                  key={game.id} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(game)}
                >
                  <div className="suggestion-content">
                    <div className="suggestion-image">
                      <img src={game.imageUrl} alt={game.title} />
                    </div>
                    <div className="suggestion-details">
                      <div className="suggestion-title">
                        {highlightMatch(game.title, searchQuery)}
                      </div>
                      <div className="suggestion-info">
                        <span className="suggestion-category">{game.category}</span>
                        <span className="suggestion-price">{game.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        {showFilters && isMobile && (
          <button 
            className="filter-toggle-button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            aria-expanded={showMobileFilters}
          >
            <span>Filters</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: showMobileFilters ? 'rotate(180deg)' : 'none' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
      </div>

      {showFilters && (!isMobile || showMobileFilters) && (
        <div className="filters-container">
          <div className="filter-dropdown">
            <button
              onClick={() => toggleDropdown('category')}
              className={`filter-button ${activeDropdown === 'category' ? 'active' : ''}`}
              aria-expanded={activeDropdown === 'category'}
            >
              {selectedCategory}
              <svg
                className={`dropdown-icon ${activeDropdown === 'category' ? 'open' : ''}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {activeDropdown === 'category' && (
              <div className="dropdown-menu">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="dropdown-item"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <button
              onClick={() => toggleDropdown('date')}
              className={`filter-button ${activeDropdown === 'date' ? 'active' : ''}`}
              aria-expanded={activeDropdown === 'date'}
            >
              {selectedDate || "Release Date"}
              <svg
                className={`dropdown-icon ${activeDropdown === 'date' ? 'open' : ''}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {activeDropdown === 'date' && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => handleDateSort("Newest to Oldest")}>
                  Newest to Oldest
                </div>
                <div className="dropdown-item" onClick={() => handleDateSort("Oldest to Newest")}>
                  Oldest to Newest
                </div>
                <div className="calendar-input-wrapper">
                  <input
                    type="date"
                    className="calendar-input"
                    onChange={handleDatePick}
                  />
                  <span className="calendar-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <button
              onClick={() => toggleDropdown('price')}
              className={`filter-button ${activeDropdown === 'price' ? 'active' : ''}`}
              aria-expanded={activeDropdown === 'price'}
            >
              {selectedPrice}
              <svg
                className={`dropdown-icon ${activeDropdown === 'price' ? 'open' : ''}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {activeDropdown === 'price' && (
              <div className="dropdown-menu price-dropdown">
                {priceOptions.map((option) => (
                  <div key={option}>
                    {option === "max-min" ? (
                      <div className="price-range-container">
                        <div
                          className="dropdown-item custom-range-option"
                          onClick={togglePriceRange}
                        >
                          Custom Range
                        </div>
                        <div className={`price-values-container ${showPriceRange ? 'visible' : ''}`}>
                          <div className="price-values">
                            <span>${minPrice}</span>
                            <span>${maxPrice}</span>
                          </div>
                          <div className="range-slider">
                            <input
                              type="range"
                              min="0"
                              max={MAX_PRICE}
                              value={minPrice}
                              onChange={handleMinPriceChange}
                              className="range-input range-min"
                            />
                            <input
                              type="range"
                              min="0"
                              max={MAX_PRICE}
                              value={maxPrice}
                              onChange={handleMaxPriceChange}
                              className="range-input range-max"
                            />
                            <div className="slider-track">
                              <div
                                className="slider-range"
                                style={{
                                  left: `${(minPrice / MAX_PRICE) * 100}%`,
                                  width: `${((maxPrice - minPrice) / MAX_PRICE) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="dropdown-item"
                        onClick={() => handlePriceSort(option)}
                      >
                        {option}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <button
              onClick={() => toggleDropdown('device')}
              className={`filter-button ${activeDropdown === 'device' ? 'active' : ''}`}
              aria-expanded={activeDropdown === 'device'}
            >
              {selectedDevice}
              <svg
                className={`dropdown-icon ${activeDropdown === 'device' ? 'open' : ''}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {activeDropdown === 'device' && (
              <div className="dropdown-menu">
                {devices.map((device) => (
                  <div
                    key={device}
                    className="dropdown-item device-item"
                    onClick={() => handleDeviceSelect(device)}
                  >
                    <span>{device}</span>
                    <DeviceIcon type={device} />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Filter Action Buttons */}
          <div className="filter-actions">
            <button 
              onClick={resetFilters} 
              className="filter-action-button reset-button"
            >
              Reset
            </button>
            <button 
              onClick={applyFilters} 
              className="filter-action-button apply-button"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        .search-bar-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px;
          gap: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .search-bar-main {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
        }

        .search-form {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .search-input {
          width: 100%;
          padding: 10px 40px 10px 16px;
          border-radius: 8px;
          background-color: #2d2d2d;
          border: 1px solid #404040;
          color: #ffffff;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        
        .search-input:focus {
          border-color: white;
          box-shadow: 0 0 0 2px rgba(92, 92, 255, 0.2);
        }

        .search-button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .suggestions-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color:rgba(45, 45, 45, 0.85);
  border: 1px solid #404040;
  border-radius: 6px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  animation: dropdown 0.2s ease-out;
}

.suggestion-item {
  padding: 8px 12px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.suggestion-item:hover {
  background-color: #383838;
}

.suggestion-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.suggestion-image {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.suggestion-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.suggestion-details {
  flex: 1;
  min-width: 0;
}

.suggestion-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.suggestion-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #b0b0b0;
}

.suggestion-category {
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.suggestion-price {
  font-weight: 500;
}

.highlight {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0 2px;
  border-radius: 2px;
}

/* Scrollbar styling for consistency */
.suggestions-dropdown::-webkit-scrollbar {
  width: 6px;
}

.suggestions-dropdown::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.suggestions-dropdown::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 3px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb:hover {
  background: #505050;
}
  @media (max-width: 768px) {
  .suggestions-dropdown {
    max-height: 250px;
  }
  
  .suggestion-item {
    padding: 6px 10px;
  }
  
  .suggestion-image {
    width: 32px;
    height: 32px;
  }
  
  .suggestion-title {
    font-size: 13px;
  }
  
  .suggestion-info {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .suggestions-dropdown {
    max-height: 200px;
  }
  
  .suggestion-image {
    width: 28px;
    height: 28px;
  }
  
  .suggestion-title {
    font-size: 12px;
  }
}
        .filter-toggle-button {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #404040;
          background-color: #2d2d2d;
          color: #ffffff;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s ease;
        }
          .filter-actions
          {
          gap: 8px;
          display: flex;
          }
        .filter-action-button 
        {
        background-color: #2d2d2d;
        color: #ffffff;
        border: 1px solid #404040;
        border-radius: 6px;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s ease;
        }
        .filter-action-button:hover {
          background-color: #383838;
      }
        .filter-toggle-button:hover {
          background-color: #383838;
        }

        .filters-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          width: 100%;
        }

        .filter-dropdown {
          position: relative;
          min-width: 120px;
          flex: 1;
        }

        .filter-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #404040;
          background-color: #2d2d2d;
          color: #ffffff;
          cursor: pointer;
          font-size: 14px;
          width: 100%;
          transition: background-color 0.2s ease;
        }
        
        .filter-button:hover {
          background-color: #383838;
        }
        
        .filter-button.active {
          background-color: #383838;
          border-color: white;
        }

        .dropdown-icon {
          stroke: #ffffff;
          transition: transform 0.2s ease;
        }
        
        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background-color: #2d2d2d;
          border: 1px solid #404040;
          border-radius: 6px;
          min-width: 150px;
          z-index: 1000;
          padding: 8px 0;
          animation: dropdown 0.2s ease-out;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .price-dropdown {
          width: 220px;
          padding: 12px;
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-item {
          padding: 8px 12px;
          color: #ffffff;
          cursor: pointer;
          transition: background-color 0.1s ease;
        }
        
        .dropdown-item:hover, .calendar-input-wrapper:hover {
          background-color: #383838;
        }

        .device-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .calendar-input-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .calendar-input {
          padding: 8px 30px 8px 12px;
          width: 100%;
          background-color: transparent;
          border: none;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          appearance: none;
        }
        
        .calendar-input::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          cursor: pointer;
        }

        .calendar-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #ffffff;
        }

        /* Updated Price Range Slider Styles */
        .price-range-container {
          width: 100%;
        }

        .custom-range-option {
          position: relative;
          z-index: 2;
        }

        .price-values-container {
          max-height: 0;
          overflow: visible;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease;
          opacity: 0;
          margin-top: 0;
        }
        
        .price-values-container.visible {
          max-height: 100px;
          opacity: 1;
          margin-top: 8px;
        }

        .price-values {
          display: flex;
          justify-content: space-between;
          color: #b0b0b0;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .range-slider {
          position: relative;
          width: 100%;
          height: 8px;
          margin: 16px 0 8px 0;
        }

        .range-input {
          position: absolute;
          width: 100%;
          height: 8px;
          top: -4px;
          background: none;
          pointer-events: none;
          -webkit-appearance: none;
          appearance: none;
          z-index: 2;
        }

        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgb(22, 22, 22);
          border: 2px solid rgb(255, 255, 255);
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          z-index: 3;
        }

        .range-input::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 8px rgba(124, 124, 124, 0.4);
        }

        .range-input::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          border: 2px solid #ffffff;
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .range-input::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 8px rgba(92, 92, 255, 0.4);
        }

        .slider-track {
          position: absolute;
          width: 100%;
          height: 8px;
          background: #404040;
          border-radius: 4px;
          top: 0;
        }

        .slider-range {
          position: absolute;
          height: 8px;
          background: linear-gradient(to right, rgb(100, 98, 98) ,rgb(0, 0, 0));
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .search-bar-container {
            padding: 8px;
            gap: 12px;
          }
          
          .filter-toggle-button {
            display: flex;
            white-space: nowrap;
          }
          
          .search-form {
            flex-grow: 1;
          }
          
          .filters-container {
            gap: 8px;
            margin-top: 4px;
          }
          
          .filter-dropdown {
            flex-basis: calc(50% - 4px);
            min-width: 0;
          }

          .price-dropdown {
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .search-bar-container {
            padding: 6px;
            gap: 8px;
          }
          
          .search-input {
            font-size: 12px;
            padding: 8px 36px 8px 12px;
          }
          
          .filter-button {
            font-size: 12px;
            padding: 6px 8px;
          }
          
          .filter-dropdown {
            flex-basis: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;