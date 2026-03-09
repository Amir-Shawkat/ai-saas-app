'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author} = await auth();
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
        .from("companions")
        .insert({
            ...formData,
            author
        })
        .select();

    if (error || !data) {
        throw new Error(error?.message || "Failed to create a companion");
    }

    return data[0];
}

export const getAllCompanions = async ({limit = 10, page = 1, subject, topic}: GetAllCompanions) => {
    const supabase = createSupabaseClient();
    let query = supabase
        .from("companions")
        .select("*")

    if (subject && topic) {
        query = (query.ilike("subject", `%${subject}%`))
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
        query = (query.ilike("subject", `%${subject}%`));
    } else if (topic) {
        query = (query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`));
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return companions;
}

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();
    const { data: companion, error } = await supabase
        .from("companions")
        .select()
        .eq("id", id)

    if (error) {
        throw new Error(error.message);
    }

    return companion[0];
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}
// lib/actions/companion.actions.ts

// export const getCompanion = async (id: string) => {
//     // 1. Validate UUID format before querying
//     const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
//     if (!uuidRegex.test(id)) {
//         console.error("Invalid UUID format provided");
//         return null; // Return null so the UI can handle the "Not Found" state
//     }

//     const supabase = createSupabaseClient();
//     const { data: companion, error } = await supabase
//         .from("companions")
//         .select()
//         .eq("id", id)
//         .single(); // Use .single() if you expect exactly one result

//     if (error) {
//         // Log the error but don't necessarily crash the whole app
//         console.error("Supabase error:", error.message);
//         return null;
//     }

//     return companion;
// }