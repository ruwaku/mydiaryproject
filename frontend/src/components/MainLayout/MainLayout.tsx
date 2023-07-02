// import useAuthSession from "hooks/useAuthSession";
import Layout from "antd/es/layout";
import { Outlet } from "react-router-dom";
import SideArea from "./SideArea/SideArea";
import ContentArea from "./ContentArea/ContentArea";

export default function MainLayout() {
  // const authSession = useAuthSession();
  // console.log(authSession);
  return (
    <Layout style={{ minHeight: "100%", flexDirection: "row" }}>
      <SideArea />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </Layout>
  );
}
