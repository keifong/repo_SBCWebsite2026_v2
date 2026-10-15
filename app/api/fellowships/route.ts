
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase environment variables" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    let query = supabase.from("fellowshipstable").select("*");

    if (tag) {
      query = query.eq("name", tag);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase fellowship query failed:", error);

      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("getFellowships error:", error);

    return NextResponse.json(
      { error: "Failed to fetch fellowships data" },
      { status: 500 }
    );
  }
}
