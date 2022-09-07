# README
This is just a NextJs + tRPC + Prisma + Vercel + Planetscale template. A Todo CRUD app.
## Getting Started locally

First, set up a .env file with a valid mysql connection string under DATABASE_URL.  
Then, add the localhost to the .env for CORS etc. `NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"`  
Then, update the DB with Prisma `npx prisma db push`  
Then run the development server:  

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployed version
Navigate to [https://roniniklas.vercel.app/](https://roniniklas.vercel.app/)
