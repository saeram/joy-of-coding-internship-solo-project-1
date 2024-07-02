"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import menu from "./menu";
import classnames from 'classnames'
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
    const currentPath = usePathname();

  const { theme } = useGlobalState();
  return <SidebarStyled theme={theme}>
    <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
        <Image width={70} height={70} src="" alt="profile" />
        </div>
        <h1>
            <span>Saeram</span>
            <span>Evensen</span>
        </h1>
    </div>
    <ul className="nav-items">
    {menu.map((item) => {
            return (
              <li 
              key={item.id}
              className={classnames({
                'nav-item p-3 hover:font-bold': true,
                 'font-bold' : item.href === currentPath,
                 })}>
                <item.icon className="inline size-5" /><Link href={item.href} className="p-3">{item.label}</Link>
              </li>
            );
          })}
    </ul>
    </SidebarStyled>;
};
const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};
`;
export default Sidebar;
