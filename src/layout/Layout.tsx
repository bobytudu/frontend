import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "components/Topbar";

export default function Layout() {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
}
