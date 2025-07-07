'use server'

import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '../supabase'

export const createAssistant = async (formData: createAssistant) => {
    const { userId: author } = await auth()
    const supabase = createSupabaseClient()

    const { data, error } = await supabase
                            .from('assistants')
                            .insert({ ... formData, author })
                            .select()

    if (error || !data) 
        throw new Error(error?.message || 'Failed to create new assistant')

    return data[0]
}

export const getAllAssistants = async ({ limit = 10, page = 1 } : GetAllAssistants) => {
    const supabase = createSupabaseClient()

    let query = supabase.from('assistants').select()

    // if (subject && topic)
    //     query = query.ilike('subject', `%${subject}%`)
    //         .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    // else if (subject)
    //     query = query.ilike('subject', `%${subject}%`)
    //         .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    // else if (topic)
    //     query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)

    query = query.range((page - 1) * limit, page * limit - 1)

    const { data: assistants, error } = await query

    if (error)
        throw new Error(error.message)
    
    return assistants
}

export const getAssistant = async (id: string) => {
    const supabase = createSupabaseClient()

    const { data, error } = await supabase
        .from('assistants')
        .select()
        .eq('id', id)

    if (error)
        throw new Error(error.message)
    
    return data[0]
}

export const addToSessionHistory = async (assistantId: string) => {
    const { userId } = await auth()
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.from('session_history')
        .insert({
            assistant_id: assistantId,
            user_id: userId
    })

    if (error)
        throw new Error(error.message)

    return data
}

export const getRecentSession = async (limit = 10) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
                            .from('session_history')
                            .select(`assistants: assistant_id (*)`)
                            .order('created_at', { ascending: false })
                            .limit(limit)
                            
    if (error)
        throw new Error(error.message)

    return data.map(({ assistants }) => assistants)
}

export const getUserSession = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
                            .from('session_history')
                            .select(`assistants: assistant_id (*)`)
                            .eq('user_id', userId)
                            .order('created_at', { ascending: false })
                            .limit(limit)
                            
    if (error)
        throw new Error(error.message)

    return data.map(({ assistants }) => assistants)
}

export const getUserAssistants = async (userId: string) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
                            .from('assistants')
                            .select()
                            .eq('author', userId)
                            
    if (error)
        throw new Error(error.message)

    return data
}
