import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

export const handler: Handler = async () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

     const { data, error } = await supabase
    .from("auTable")
    .select("*")
    .order("date", { ascending: false })
    .order("id", { ascending: false });

    if (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
}