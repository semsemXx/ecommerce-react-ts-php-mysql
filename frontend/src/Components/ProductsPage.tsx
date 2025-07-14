import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import GameCarouselProducts from './GameCarouselProducts';
import BackgroundAssassinsCreed from "../Assets/Images/image-1.png";
import BackgroundEldenRing from "../Assets/Images/image-6.png";
import BackgroundSekiro from "../Assets/Images/image4.png";
import BackgroundRedDeadRedemption from "../Assets/Images/image12.png";
import BackgroundResidentEvil from "../Assets/Images/image13.png";
import BackgroundCOD from "../Assets/Images/image19.png";
import BackgroundTheLegendOfZelda from "../Assets/Images/image.png";

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

export default function ProductsPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "Category",
    dateSort: "",
    priceRange: {
      min: 0,
      max: 100
    },
    priceSort: "",
    device: ""
  });

  const games: Game[] = [
    {
      id: "1",
      title: "Assassin's Creed Shadows",
      price: "7,99 $US",
      category: "Action",
      imageUrl: BackgroundAssassinsCreed,
      supportedPlatforms: ["PlayStation", "Windows"],
      releaseDate: new Date("2025-03-20"),
    },
    {
      id: "2",
      title: "Elden Ring",
      price: "12,99 $US",
      category: "RPG",
      imageUrl: BackgroundEldenRing,
      supportedPlatforms: ["Windows"],
      releaseDate: new Date("2022-02-25"),
    },
    {
      id: "3",
      title: "The Legend of Zelda: Tears of the Kingdom",
      price: "22,49 $US",
      originalPrice: "24,99 $US",
      discount: "-10%",
      category: "Adventure",
      imageUrl: BackgroundTheLegendOfZelda,
      supportedPlatforms: ["Nintendo"],
      releaseDate: new Date("2023-05-12"),
    },
    {
      id: "4",
      title: "Sekiro: Shadows Die Twice",
      price: "69,99 $US",
      category: "Action",
      imageUrl: BackgroundSekiro,
      supportedPlatforms: ["PlayStation", "Xbox", "Windows"],
      releaseDate: new Date("2019-03-22"),
    },
    {
      id: "5",
      title: "Red Dead Redemption 2",
      price: "49,99 $US",
      category: "Action",
      imageUrl: BackgroundRedDeadRedemption,
      supportedPlatforms: ["Xbox", "Windows"],
      releaseDate: new Date("2018-10-26"),
    },
    {
      id: "6",
      title: "Resident Evil 4 Remake",
      price: "49,99 $US",
      category: "Adventure",
      imageUrl: BackgroundResidentEvil,
      supportedPlatforms: ["PlayStation", "Xbox", "Windows"],
      releaseDate: new Date("2023-03-24"),
    },
    {
      id: "7",
      title: "Call of Duty Black Ops III",
      price: "59,99 $US",
      category: "Action",
      imageUrl: BackgroundCOD,
      supportedPlatforms: ["PlayStation", "Xbox"],
      releaseDate: new Date("2015-11-06"),
    },
  ];

  const [filteredGames, setFilteredGames] = useState<Game[]>(games);

  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/[^0-9,]/g, '').replace(',', '.'));
  };

  useEffect(() => {
    let result = [...games];

    // Apply text search filter
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase();
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== "Category") {
      result = result.filter(game => game.category === filters.category);
    }

    // Apply device filter
    if (filters.device) {
      result = result.filter(game => 
        game.supportedPlatforms.includes(filters.device)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      result = result.filter(game => {
        const price = parsePrice(game.price);
        return price >= filters.priceRange.min && price <= filters.priceRange.max;
      });
    }

    // Apply date sort
    if (filters.dateSort) {
      result.sort((a, b) => {
        const dateA = new Date(a.releaseDate).getTime();
        const dateB = new Date(b.releaseDate).getTime();
        return filters.dateSort === "Newest to Oldest" ? dateB - dateA : dateA - dateB;
      });
    }

    // Apply price sort
    if (filters.priceSort) {
      result.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        if (filters.priceSort === "Low to High") {
          return priceA - priceB;
        } else if (filters.priceSort === "High to Low") {
          return priceB - priceA;
        }
        return 0;
      });
    }

    setFilteredGames(result);
  }, [filters]);

  const handleSearch = (searchFilters: SearchFilters) => {
    console.log("Applied filters:", searchFilters);
    setFilters(searchFilters);
  };

  return (
    <div style={{ background: '#101014', height: '100%', minHeight: '100vh' }}>
      <SearchBar onSearch={handleSearch} games={games} />
      <GameCarouselProducts filters={filters} games={filteredGames} />
    </div>
  );
}