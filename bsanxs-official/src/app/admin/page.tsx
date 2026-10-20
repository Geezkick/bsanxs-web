import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminDashboard, { type Enquiry } from "./AdminDashboard";

export const instant = false;

export default async function AdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  const claims = data?.claims as
    | { app_metadata?: { role?: string } }
    | undefined;

  if (error || claims?.app_metadata?.role !== "admin") {
    redirect("/admin/login");
  }

  const { data: enquiries, error: enquiryError } = await supabase
    .from("project_enquiries")
    .select("id,name,email,company,service,budget,message,status,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <AdminDashboard
      initialEnquiries={(enquiries ?? []) as Enquiry[]}
      loadError={enquiryError?.message ?? null}
    />
  );
}
