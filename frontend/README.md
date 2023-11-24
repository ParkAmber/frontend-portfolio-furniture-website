<<<<<<< HEAD
Overview: This project revolves around a furniture website, where I assumed responsibility for the entire development process—from web design and frontend development to backend implementation and production deployment. My primary focus centered on crafting seamless login/signup functionalities on both the frontend and backend, emphasizing login authorization and authentication. The core features encompass search, payment processing, file uploads, and orchestrating the controlled flow of data between the frontend and backend.

Challenges:

While implementing CRUD APIs using ORM, I encountered difficulties in consolidating diverse data from various tables.

Streamlining the logout process.

Overcoming CORS issues when handling token storage in cookies, transmitting them to the backend, and processing backend responses.

Tackling deadlocks.

Addressing refactoring needs, particularly eliminating redundant code with props.

Mitigating unnecessary rerenders.

Minimizing reflows.

Solutions:

To address the data combination issue in DB, I adopted a strategy of saving each distinct dataset and facilitating dependency injection.

Utilizing Redis, I implemented a blacklist for stored tokens and streamlined Redis deployment through Docker for efficiency.

Configuring cookie settings with permitted origins, employing setHeader, and incorporating secure and httponly options to fortify protection against JavaScript manipulation via setCookie.

Standardizing the sequence of table queries across all APIs.

Abandoning the use of props through the implementation of custom hooks.

Employing memoization techniques such as useCallback() and prev to prevent unnecessary rerenders.

Establishing fixed heights for data placements to prevent browser reflows.
=======
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> 95c8cf1 (refactor)
