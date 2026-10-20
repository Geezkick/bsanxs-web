import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const allowedStatuses = ["new", "in_progress", "closed"] as const;

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getClaims();

  const claims = data?.claims as
    | { app_metadata?: { role?: string } }
    | undefined;

  if (authError || claims?.app_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { id, status } = body as { id?: unknown; status?: unknown };

  if (
    typeof id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ||
    typeof status !== "string" ||
    !allowedStatuses.includes(status as (typeof allowedStatuses)[number])
  ) {
    return NextResponse.json({ error: "Invalid enquiry ID or status" }, { status: 400 });
  }

  const { error } = await supabase
    .from("project_enquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Unable to update enquiry. Check database permissions." }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}
