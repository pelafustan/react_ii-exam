import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ErrorElement } from "./views/ErrorElement";
import { Home } from "./views/Home";
import { Menu } from "./views/Menu";
import { About } from "./views/About";
import { PizzaView } from "./views/Pizza";
import { CartProvider } from "./contexts/CartProvider";

import pizzas from "./data/pizzas.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      loader: async () => {
        return pizzas
      },
      errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "pizzas",
          element: <Menu />,
          loader: async () => {
            return pizzas
          }
        },
        {
          path: "pizzas/:id",
          element: <PizzaView />,
          loader: async ({ params }) => {
            return pizzas.find(pizza => pizza.id === params.id)
          },
        },
        {
          path: "about",
          element: <About />,
        },
      ]
    },
  ],
  {
    basename: "/react_ii-exam",
  },
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);
