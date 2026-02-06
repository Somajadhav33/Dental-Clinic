"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TopBar from "@/components/admin_models/TopBar";
import AdminPageContent from "@/components/admin_models/AdminPageContent";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");

    if (!jwtToken) {
      router.push("/admin-login");
      return;
    }

    const validate = async () => {
      const response = await fetch("/api/verify", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        router.push("/admin-login");
      }
    };

    validate();
  }, [router]);

  return (
    <>
      <TopBar />
      <div>
        <AdminPageContent />
      </div>
    </>
  );
}
