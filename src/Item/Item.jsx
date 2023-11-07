import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiKey, apiUrl } from "../App";

const Item = () => {
  const params = useParams();
  const [item, setItem] = useState({});
  const [buttonText, setButtonText] = useState("Add To Favorites");

  //   console.log(params);

  const getList = async () => {
    try {
      if (params.id !== "") {
        const result = await axios.get(
          `${apiUrl}/?i=${params.id}&apikey=${apiKey}`
        );
        if (result.status === 200 && result.data.Response === "True") {
          setItem(result.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log(item);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          padding: 10,
          background: "black",
          color: "white",
          alignItems: "center",
          paddingRight: 40,
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/favorites")}
        >
          Favorites
        </div>
      </div>
      {item ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 40,
            alignItems: "center",
            gap: 60,
          }}
        >
          <div>
            <img src={item.Poster} />
          </div>
          <div>
            <h2>{item.Title}</h2>
            {item.Title && (
              <p>
                <strong>Actors:</strong> {item.Actors}
              </p>
            )}
            {item.Awards && (
              <p>
                <strong>Awards:</strong> {item.Awards}
              </p>
            )}
            {item.Director && (
              <p>
                <strong>Director:</strong> {item.Director}
              </p>
            )}
            {item.Genre && (
              <p>
                <strong>Genre:</strong> {item.Genre}
              </p>
            )}
            {item.Language && (
              <p>
                <strong>Language:</strong> {item.Language}
              </p>
            )}
            {item.Rated && (
              <p>
                <strong>Rated:</strong> {item.Rated}
              </p>
            )}
            {item.Runtime && (
              <p>
                <strong>Runtime:</strong> {item.Runtime}
              </p>
            )}
            {item.Writer && (
              <p>
                <strong>Writer:</strong> {item.Writer}
              </p>
            )}
            {item.Year && (
              <p>
                <strong>Release Year:</strong> {item.Year}
              </p>
            )}
            {item.imdbRating && (
              <p>
                <strong>IMDB Rating:</strong> {item.imdbRating}
              </p>
            )}
            {item.BoxOffice && (
              <p>
                <strong>Box Office Collection:</strong> {item.BoxOffice}
              </p>
            )}
            {item.Plot && (
              <p>
                <strong>Plot:</strong>
                {item.Plot}
              </p>
            )}
            {item && (
              <button
                onClick={() => setButtonText("Remove from Favorites")}
                style={{
                  background:
                    buttonText === "Remove from Favorites" ? "red" : "black",
                }}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Item;
