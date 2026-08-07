import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

export const handler: Handler = async (event) => {
    console.log('tag:', event.queryStringParameters?.tag)
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!
    )


    const tag = event.queryStringParameters?.tag
    let query = supabase.from('fellowshipstable').select('*')
    if (tag) {
        query = query.eq('name', tag) // filter by name column
    }
    

    // const { data, error } = await supabase.from('fellowshipstable').select('*')
    const { data, error } = await query

    if (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}