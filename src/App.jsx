import { createBrowserRouter } from "react-router-dom";
import List from "./List/List";
import Item from "./Item/Item";

export const apiKey = "88ffad7c";
export const imdbId = "tt3896198";
export const apiUrl = "https://www.omdbapi.com";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/item/:id",
    element: <Item />,
  },
]);
