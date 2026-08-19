import { createBrowserRouter } from "react-router";
import PortfolioPage from "./App";
import { ZayMatePage } from "./ZayMate";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PortfolioPage,
  },
  {
    path: "/zaymate",
    Component: ZayMatePage,
  },
]);
