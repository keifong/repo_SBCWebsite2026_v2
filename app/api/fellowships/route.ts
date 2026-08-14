//fellowships route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase
            .from("fellowshipstable")
            .select("*");

        if (error) {
            return NextResponse.json(
                { error: error.message },
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