# S-Well Agent OS Final Package

## Local run
1. `npm install`
2. Create `.env.local`
3. Add `OPENAI_API_KEY=your_key`
4. `npm run dev`

## Deploy to Vercel
1. Upload this folder to GitHub
2. Import the repository in Vercel
3. Add `OPENAI_API_KEY` in Project Settings → Environment Variables
4. Deploy

## Included
- Fixed-height chat panel with internal scrolling
- Language switching for the whole interface
- CEO / CTO / CMO portrait cards
- OpenAI API route with fallback reply
- Next.js App Router structure


## TypeScript note
This fixed package includes:
- typescript
- @types/node
- @types/react
- @types/react-dom
- tsconfig.json
- next-env.d.ts
