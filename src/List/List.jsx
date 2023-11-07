import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiKey, apiUrl } from "../App";

const List = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const getList = async () => {
    try {
      if (search !== "") {
        const result = await axios.get(
          `${apiUrl}/?s=${search}&apikey=${apiKey}&page=${pageNumber}`
        );
        if (result.status === 200 && result.data.Response === "True") {
          setList([...result.data.Search]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getList();
  }, [search, pageNumber]);

  console.log(list);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: 10,
            background: "black",
            color: "white",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div>
            <input
              id="search"
              type="text"
              value={search}
              style={{width: 500, padding: 10, borderRadius: 8, fontSize: 16}}
              placeholder="Search Movies, TV Shows..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/favorites")}
          >
            Favorites
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {list.length > 0 ? (
            list.map((l) => {
              return (
                <div
                  key={l.imdbID}
                  onClick={() => navigate(`/item/${l.imdbID}`)}
                >
                  <img src={l.Poster} />
                  <p>
                    <strong>Title:</strong> {l.Title}
                  </p>
                  <p>
                    <strong>Release Year:</strong> {l.Year}
                  </p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        {list.length > 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              prev
            </button>
            {pageNumber}
            <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default List;
