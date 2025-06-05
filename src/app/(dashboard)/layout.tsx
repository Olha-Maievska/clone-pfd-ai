import DashboardBar from "@/components/DashboardBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardBar />
      {children}
    </>
  );
}
