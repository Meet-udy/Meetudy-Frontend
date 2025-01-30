import React, { useState } from "react";
import { Layout } from "../../components/layout/Header/Header.tsx";
import { SearchBar } from "../../components/bar/SearchBar/SearchBar.tsx";
import { SearchButton } from "../../components/button/SearchButton/SearchButton.tsx";
import { NavBar } from "../../components/layout/NavBar/NavBar.tsx";
import { UserMenu } from "../../components/layout/UserMenu/UserMenu.tsx";
import "../../components/bar/SearchBar/SearchBar.css";
import "../../components/button/SearchButton/SearchButton.css";
import '../../components/layout/Header/Header.css';
import "../../components/layout/NavBar/NavBar.css";
import "../../components/layout/UserMenu/UserMenu.css";
import "./HomePage.css";

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const handleSearch = () => console.log("검색어:", searchQuery);

  return (
    <div className="home-page-container">
      <Layout>
        <NavBar />
        <UserMenu />
      </Layout>

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