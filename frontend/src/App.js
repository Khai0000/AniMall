import "./App.css";
import Layout from "./Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pet from "./pages/Pet";
import Community from "./pages/Community";
import Product from "./pages/Product";
import Services from "./pages/Services";
import Home from "./pages/Home";
import ForumPostDetails from "./ginkhai/pages/ForumPostDetails";
import ForumAddPost from "./ginkhai/pages/ForumAddPost";
import ForumHome from "./ginkhai/pages/ForumHome";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/pet", element: <Pet /> },
        {
          path: "/community",
          element: <Community />,
          children: [
            { path: "/community", element: <ForumHome /> },
            { path: "/community/post/:postId", element: <ForumPostDetails /> },
            { path: "/community/post/add", element: <ForumAddPost /> },
          ],
        },
        { path: "/product", element: <Product /> },
        { path: "/services", element: <Services /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
