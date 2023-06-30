import AntdProvider from "components/AntdProvider/AntdProvider";
import MainLayout from "layouts/MainLayout/MainLayout";
import AboutPage from "pages/AboutPage/AboutPage";
import HomePage from "pages/HomePage/HomePage";
import NoMatch from "pages/NoMatch/NoMatch";
import StoryEditorPage from "pages/StoryEditorPage/StoryEditorPage";
import StoryListPage from "pages/StoryListPage/StoryListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import KakaoLoginCallback from "components/OAuth/KakaoLoginCallback/KakaoLoginCallback";
import { AuthSessionProvider } from "components/AuthSessionProvider/AuthSessionProvider";
import MyPage from "pages/MyPage/MyPage";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    errorElement: <NoMatch />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "story",
        children: [
          { index: true, element: <StoryListPage /> },
          { path: "editor", element: <StoryEditorPage /> },
        ],
      },
      { path: "about", element: <AboutPage /> },
      { path: "me", element: <MyPage /> },
    ],
  },
  {
    path: "/login",
    element: <KakaoLoginCallback />,
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AntdProvider>
        <AuthSessionProvider>
          <RouterProvider router={router} />
        </AuthSessionProvider>
      </AntdProvider>
    </QueryClientProvider>
  );
}

export default App;
