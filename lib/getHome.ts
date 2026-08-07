import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

export const handler: Handler = async () => {
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!
    )

    const { data, error } = await supabase.from('hometable').select('*')

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