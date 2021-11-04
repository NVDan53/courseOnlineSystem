import React from "react";
import { Menu } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  CarryOutOutlined,
  TeamOutlined,
  CoffeeOutlined,
  AudioOutlined,
  DesktopOutlined,
  FormOutlined,
  EditOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const TopNav = () => {
  const { Item } = Menu;
  return (
    <Menu mode="horizontal">
      <Item icon={<AppstoreOutlined />}>
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>
      <Item icon={<AppstoreOutlined />}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>
      <Item icon={<AppstoreOutlined />}>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
