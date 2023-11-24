import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ROUTES } from "./constants/routes";
import Users from "./components/Users/Users";
import Posts from "./components/Posts/Posts";
import Albums from "./components/Albums/Albums";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Users />,
  },
  {
    path: ROUTES.USER_POSTS,
    element: <Posts />,
  },
  {
    path: ROUTES.USER_ALBUMS,
    element: <Albums />,
  },
  {
    path: ROUTES.NO_MATCH,
    element: <h4>Oops, wrong route!</h4>,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
