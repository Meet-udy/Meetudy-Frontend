import React, { useState } from "react";
import { Layout } from "../components/layout/Header.tsx";
import { SearchBar } from "../components/bar/SearchBar.tsx";
import { SearchButton } from "../components/button/SearchButton.tsx";
import { NavBar } from "../components/layout/NavBar.tsx";
import { UserMenu } from "../components/layout/UserMenu.tsx";
import "../components/bar/SearchBar.css";
import "../components/button/SearchButton.css";
import "../components/layout/Header.css";
import "../components/layout/NavBar.css";
import "../components/layout/UserMenu.css";
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