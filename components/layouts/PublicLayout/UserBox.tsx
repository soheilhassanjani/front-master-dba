"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import Link from "next/link";
import React from "react";
import { Grid, LogIn, LogOut, User, UserCheck } from "react-feather";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/core/Popover";
import { useGetAccountGetUserData } from "@/hooks/apis/accountHookApi";
import { setIsLogin } from "@/redux/authSlice";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/utils/cn";

const UserBox = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isChecked, isLogin } = useAppSelector((state) => state.auth);
  const { data: user } = useGetAccountGetUserData(isChecked && isLogin);
  //
  const handleLogout = () => {
    dispatch(setIsLogin(false));
    Cookies.remove("TOKEN");
    queryClient.clear();
    push("/");
  };
  //
  if (!isChecked) return <div></div>;
  //
  if (!isLogin)
    return (
      <div className="flex items-center gap-4">
        <Link
          prefetch={false}
          href="/login"
          className={cn("flex items-center gap-1 hover:text-primary", {
            "text-primary": pathname.startsWith("/login"),
          })}
        >
          <LogIn className="pe-1" />
          ورود
        </Link>
        |
        <Link
          prefetch={false}
          href="/register"
          className={cn("hover:text-primary", {
            "text-primary": pathname.startsWith("/register"),
          })}
        >
          عضویت
        </Link>
      </div>
    );
  //
  return (
    <Popover placement="bottom-start" typeInteract="click">
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
          <User />
          <Link href="/" prefetch={false} className="font-14">
            پروفایل من
          </Link>
        </div>
      </PopoverTrigger>
      <PopoverContent className="z-20 rounded-xl border bg-white p-3">
        <ul className="flex flex-col gap-4">
          <li>{user?.FullName}</li>
          <hr className="dropdown-divider" />
          {user?.IsAdmin && (
            <li className="flex items-center gap-2">
              <Grid />
              <Link href="/dashboard" prefetch={false}>
                پنل ادمین
              </Link>
            </li>
          )}
          <li className="flex items-center gap-2">
            <UserCheck />
            <Link href="#" prefetch={false}>
              حساب شخصی من
            </Link>
          </li>
          <hr />
          <li className="flex items-center gap-2">
            <LogOut />
            <button onClick={handleLogout}>خروج</button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default UserBox;
