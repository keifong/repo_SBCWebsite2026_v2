//contactus route.ts
// events route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
    // console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
    // console.log(
    //     "SUPABASE_KEY exists:",
    //     !!process.env.SUPABASE_KEY
    // );

    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase
            .from("cuTable")
            .select("*");

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("getContactUs error:", error);

        return NextResponse.json(
            { error: "Failed to fetch Contact Us data" },
            { status: 500 }
        );
    }
}