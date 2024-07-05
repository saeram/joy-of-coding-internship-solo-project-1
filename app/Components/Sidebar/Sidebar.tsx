"use client";

import Image from "next/image";
import React from "react";
import menu from "./menu";
import classnames from 'classnames'
import { usePathname } from "next/navigation";
import Link from "next/link";
import SignOut from "../Button/SignOut";
import { useUser } from "@clerk/nextjs";

const Sidebar = () => {
    const currentPath = usePathname();
  const { user } = useUser();
  const { firstName, lastName, imageUrl } = user || { 
    firstName: "",
     lastName: "",
     imageUrl: "", 
    };

  return <div className="relative w-[250px] bg-slate-100 rounded-xl text-slate-700 flex flex-col justify-between">
    <div className="m-2 p-1 relative rounded-xl bg-slate-300 cursor-pointer font-medium text-slate-700 flex items-center">
        <div className="image">
        <Image width={60} height={60} src={imageUrl} alt="profile" className="inline-block relative rounded-full overflow-hidden m-2" />
        </div>
        <h1 className="flex flex-col ml-5 font-bold">
            {firstName} {lastName}
        </h1>
    </div>
    <ul className="relative p-2 m-1 place-self-center">
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
    <div className="place-self-center mb-3">
    <SignOut />
    </div>
    </div>;
};

export default Sidebar;
