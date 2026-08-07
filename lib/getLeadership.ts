import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import { getImageUrl } from '../../public/supabase-img'

export const handler: Handler = async () => {
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!
    )

    const { data, error } = await supabase.from('leadershipTable').select('*')

    if (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }

    // Transform image paths to optimized URLs before sending to frontend
    // const enriched = data.map((person: any) => ({
    //     ...person,
    //     imageUrl: getImageUrl("tsbc_website_images", person.image, "medium")
    // }))

    return {
        statusCode: 200,
        body: JSON.stringify(data)
        // body: JSON.stringify(enriched)
    }
}