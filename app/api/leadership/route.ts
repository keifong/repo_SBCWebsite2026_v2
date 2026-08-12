import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase
            .from("leadershipTable")
            .select("*");

        if (error) {
            console.error("Supabase leadership error:", error);

            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("getLeadership error:", error);

        return NextResponse.json(
            { error: "Failed to fetch leadership data" },
            { status: 500 }
        );
    }
}