Overview: This project revolves around a furniture website, where I assumed responsibility for the entire development process—from web design and frontend development to backend implementation and production deployment. My primary focus centered on crafting seamless login/signup functionalities on both the frontend and backend, emphasizing login authorization and authentication. The core features encompass search, payment processing, file uploads, and orchestrating the controlled flow of data between the frontend and backend.

Challenges:

1. While implementing CRUD APIs using ORM, I encountered difficulties in consolidating diverse data from various tables.
2. Streamlining the logout process.
3. Overcoming CORS issues when handling token storage in cookies, transmitting them to the backend, and processing backend responses.
4. Tackling deadlocks.
5. Addressing refactoring needs, particularly eliminating redundant code with props.
6. Mitigating unnecessary rerenders.
7. Minimizing reflows.

Solutions:

1. To address the data combination issue in DB, I adopted a strategy of saving each distinct dataset and facilitating dependency injection.
2. Utilizing Redis, I implemented a blacklist for stored tokens and streamlined Redis deployment through Docker for efficiency.
3. Configuring cookie settings with permitted origins, employing setHeader, and incorporating secure and httponly options to fortify protection against JavaScript manipulation via setCookie.
4. Standardizing the sequence of table queries across all APIs.
5. Abandoning the use of props through the implementation of custom hooks.
6. Employing memoization techniques such as useCallback() and prev to prevent unnecessary rerenders.
7. Establishing fixed heights for data placements to prevent browser reflows.
