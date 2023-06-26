import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "./icons/SearchIcon";

const Search = () => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) navigate(`/search/${keyword}`)
        else navigate('/')
    }

  return (
    <form
    onSubmit={searchHandler}
    >
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            {/* <i className="fa fa-search" aria-hidden="true"></i> */}
            {/* <i className="fa-regular fa-magnifying-glass text-danger"></i> */}
            <SearchIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
