// Optional Supabase Edge Function placeholder.
// This app does NOT require Supabase — it is fully offline-first by default (spec requirement #13).
// If you choose to enable cloud-backed AI mock generation later, implement it here and call it
// from src/features/ai-mock/AiMockTest.tsx instead of (or in addition to) the direct Gemini call.
//
// Example shape (uncomment and adapt once you add the Supabase CLI/project):
//
// import { serve } from 'https://deno.land/std/http/server.ts'
//
// serve(async (req) => {
//   const { subjectId, count } = await req.json()
//   // ... call an LLM provider here using a server-side secret, never a client-exposed key ...
//   return new Response(JSON.stringify({ questions: [] }), { headers: { 'Content-Type': 'application/json' } })
// })

export {}
