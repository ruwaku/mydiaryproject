import Layout from "antd/es/layout";
import theme from "antd/es/theme";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function SideArea() {
  const antd = theme.useToken();
  return (
    <Layout.Sider
      width={260}
      style={{
        background: antd.token.colorBgContainer,
        borderRightWidth: 1,
        borderRightColor: antd.token.colorBorder,
        borderRightStyle: "dotted",
      }}
    >
      <div style={{ padding: 20, position: "sticky", top: 0 }}>
        <Layout.Header
          style={{
            height: "auto",
            padding: 0,
            margin: "1rem 0",
            background: "inherit",
          }}
        >
          <Logo />
        </Layout.Header>
        <NavMenu />
      </div>
    </Layout.Sider>
  );
}
