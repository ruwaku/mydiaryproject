import Breadcrumb from "antd/es/breadcrumb";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Layout from "antd/es/layout";
import Space from "antd/es/space";
import theme from "antd/es/theme";
import RemixIcon from "components/RemixIcon/RemixIcon";
import { Link, useLocation } from "react-router-dom";

export default function ContentArea({ children }: React.PropsWithChildren) {
  const antd = theme.useToken();
  const { pathname, search } = useLocation();
  const breadcrumbItems: ItemType[] =
    pathname === "/"
      ? []
      : [
          { key: "home", href: "/", title: <RemixIcon name="home" /> },
          ...pathname
            .split("/")
            .slice(1)
            .map((pathSlice, i) => ({
              key: pathSlice,
              href: (pathname + search)
                .split("/")
                .slice(0, i + 2)
                .join("/"),
              title: pathSlice,
            })),
        ];
  return (
    <Layout.Content
      style={{
        background: antd.token.colorBgLayout,
        minWidth: 600,
        padding: "0 1rem",
      }}
    >
      <Space
        direction="vertical"
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1024,
          flexShrink: "0",
          margin: "50px auto",
        }}
      >
        {breadcrumbItems.length > 1 && (
          <Breadcrumb
            itemRender={({ href, title }) => <Link to={href!}>{title}</Link>}
            items={breadcrumbItems}
          />
        )}
        <div
          style={{
            position: "relative",
            padding: "1.75rem 1.5rem",
            background: antd.token.colorBgContainer,
            width: "100%",
          }}
        >
          {children}
        </div>
      </Space>
    </Layout.Content>
  );
}
