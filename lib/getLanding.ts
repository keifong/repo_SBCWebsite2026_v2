import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

export const handler: Handler = async () => {
    // console.log('URL:', process.env.SUPABASE_URL)
    // console.log('KEY:', process.env.SUPABASE_KEY)
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!
    )
    // remember to set the right table spelling
    const { data, error } = await supabase.from('landingtable').select('*')

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