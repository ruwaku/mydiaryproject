import "antd/dist/reset.css";
import AntdProvider from "components/AntdProvider/AntdProvider";
import { AuthSessionProvider } from "components/AuthSessionProvider/AuthSessionProvider";
import KakaoLoginCallback from "components/OAuth/KakaoLoginCallback/KakaoLoginCallback";
import MainLayout from "layouts/MainLayout/MainLayout";
import AboutPage from "pages/AboutPage/AboutPage";
import HomePage from "pages/HomePage/HomePage";
import MyPage from "pages/MyPage/MyPage";
import NoMatch from "pages/NoMatch/NoMatch";
import StoryEditorPage from "pages/StoryEditorPage/StoryEditorPage";
import StoryListPage from "pages/StoryListPage/StoryListPage";
import StoryViewerPage from "pages/StoryViewerPage/StoryViewerPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";

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
          { path: ":storyId", element: <StoryViewerPage /> },
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
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AntdProvider>
          <AuthSessionProvider>
            <RouterProvider router={router} />
          </AuthSessionProvider>
        </AntdProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
