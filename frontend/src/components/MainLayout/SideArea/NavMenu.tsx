"use client";
import FlexBox from "components/FlexBox/FlexBox";
import RemixIcon from "components/RemixIcon/RemixIcon";
import Avatar from "antd/es/avatar";
import Menu from "antd/es/menu";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link, useLocation } from "react-router-dom";
import useAuthSession from "hooks/useAuthSession";

const navItems: ItemType[] = [
  {
    key: "/",
    label: <Link to="/">Home</Link>,
    icon: <NavItemIcon name="home" match="/" />,
  },
  {
    key: "/story",
    label: <Link to="/story">Story</Link>,
    icon: <NavItemIcon name="booklet" match="/story" />,
  },
  {
    key: "/about",
    label: <Link to="/about">About</Link>,
    icon: <NavItemIcon name="information" match="/about" />,
  },
];

function NavItemIcon({ name, match }: { name: string; match: string }) {
  const { pathname } = useLocation();
  return (
    <RemixIcon
      name={name}
      suffix={match === pathname ? "fill" : "line"}
      fontSize="1rem"
      style={{ marginRight: 7, verticalAlign: "-5px" }}
    />
  );
}

export default function NavMenu() {
  const { pathname } = useLocation();
  const authSession = useAuthSession();
  const extendNavItems: ItemType[] = [
    ...navItems,
    ...(authSession.status === "authenticated"
      ? ([
          {
            type: "divider",
          },
          {
            key: "/me",
            label: (
              <Link to="/me">
                <FlexBox columnGap="7px" alignItems="center" style={{ padding: "10px 0" }}>
                  <Avatar
                    icon={<img src={authSession.current.photoURL!} alt="사용자 프로필 사진" />}
                  />
                  {authSession.current.displayName}
                </FlexBox>
              </Link>
            ),
            style: { height: "auto", padding: "0 0.5rem", marginTop: 10 },
          },
        ] as ItemType[])
      : []),
  ];
  const selectedKey = extendNavItems.find((item) => item?.key === pathname)?.key as string;
  console.log("<NavMenu> Selected:", selectedKey);
  return (
    <FlexBox direction="column">
      <Menu
        mode="vertical"
        items={extendNavItems}
        selectedKeys={selectedKey ? [selectedKey] : []}
        style={{
          border: 0,
          borderRadius: 5,
          background: "inherit",
          fontSize: "inherit",
        }}
      />
    </FlexBox>
  );
}
