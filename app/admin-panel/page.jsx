"use client";
import AdminPageContent from "@/components/admin_models/AdminPageContent";
import TopBar from "@/components/admin_models/TopBar";
import React, { useState } from "react";

export default function Page() {
  return (
    <>
      <TopBar />
      <div>
        <AdminPageContent />
      </div>
    </>
  );
}
