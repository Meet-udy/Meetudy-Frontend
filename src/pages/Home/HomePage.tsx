import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header.tsx";
import { SearchBar } from "../../components/ui/SearchBar.tsx";
import { SearchButton } from "../../components/ui/SearchButton.tsx";
import { fetchAutoComplete } from "../../api/searchApi.ts";

import "./HomePage.css";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const [groupNameSuggestions, setGroupNameSuggestions] = useState<string[]>([]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const result = await fetchAutoComplete(query);
      setCategorySuggestions(result.categories);
      setGroupNameSuggestions(result.groupNames);
    } else {
      setCategorySuggestions([]);
      setGroupNameSuggestions([]);
    }
  };
  
  const handleSuggestionClick = (value: string) => {
    if (categorySuggestions.includes(value)) {
      navigate(`/search?type=category&value=${encodeURIComponent(value)}`);
    } else if (groupNameSuggestions.includes(value)) {
      navigate(`/search?type=group&value=${encodeURIComponent(value)}`);
    }
  };

  const handleSearch = () => console.log("검색어:", searchQuery);

  return (
    <div className="home-page-container">
      <Header /> 
      <main>
        <section className="home-page">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            categorySuggestions={categorySuggestions}
            groupNameSuggestions={groupNameSuggestions}
            onSuggestionClick={handleSuggestionClick}
          />
          <SearchButton onClick={handleSearch} />
        </section>
      </main>
    </div>
  );
};