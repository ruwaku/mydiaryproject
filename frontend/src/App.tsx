import "antd/dist/reset.css";
import AntdProvider from "components/AntdProvider/AntdProvider";
import { AuthSessionProvider } from "components/AuthSessionProvider/AuthSessionProvider";
import MainLayout from "components/MainLayout/MainLayout";
import KakaoLoginCallback from "components/OAuth/KakaoLoginCallback/KakaoLoginCallback";
import WithAuthSession from "components/WithAuthSession/WithAuthSession";
import AboutPage from "pages/AboutPage/AboutPage";
import HomePage from "pages/HomePage/HomePage";
import MyPage from "pages/MyPage/MyPage";
import NoMatch from "pages/NoMatch/NoMatch";
import StoryEditorPage from "pages/StoryEditorPage/StoryEditorPage";
import StoryListPage from "pages/StoryListPage/StoryListPage";
import StoryViewerPage from "pages/StoryViewerPage/StoryViewerPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";

const router = createBrowserRouter([
  {
    errorElement: <NoMatch />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <WithAuthSession element={<Outlet />} />,
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
          { path: "me", element: <MyPage /> },
        ],
      },
      { path: "about", element: <AboutPage /> },
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
