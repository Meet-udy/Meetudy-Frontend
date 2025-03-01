import React, { useState } from "react";
import { Header } from "../../components/layout/Header.tsx";
import { SearchBar } from "../../components/ui/SearchBar.tsx";
import { SearchButton } from "../../components/ui/SearchButton.tsx";
import "./HomePage.css";

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const handleSearch = () => console.log("검색어:", searchQuery);

  return (
    <div className="home-page-container">
      <Header /> 
      <main>
        <section className="home-page">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <SearchButton onClick={handleSearch} />
        </section>
      </main>
    </div>
  );
};