"use client";

import React from "react";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {posts.map((postData) => (
      <PromptCard
        key={postData._id}
        postData={postData}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
);

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const responseJSON = await response.json();

    setAllPosts(responseJSON);
  };

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const changeSearchTerm = (e) => {
    clearTimeout(searchTimeout);
    setSearchTerm(e.target.value);

    const filteredPosts = filterPosts(searchTerm);

    setSearchTimeout(
      setTimeout(() => {
        setSearchedPosts(filteredPosts);
      }, 500)
    );
  };
  const handleTagClick = (tag) => {
    clearTimeout(searchTimeout);
    setSearchTerm(tag);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(tag);
        setSearchedPosts(searchResult);
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search"
          defaultValue={searchTerm}
          onChange={changeSearchTerm}
          className="search_input peer"
        />
      </form>
      {searchTerm ? (
        <PromptCardList posts={searchedPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList posts={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
