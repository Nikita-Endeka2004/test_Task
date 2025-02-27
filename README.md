# Recipe Application

A full-stack application for browsing recipes, built with Node.js, Express, React, TypeScript, and Next.js.

## Features

- **Backend**:
    - Node.js with Express.js
    - TypeScript
    - External API integration (TheMealDB API)

- **Frontend**:
    - React.js
    - TypeScript
    - Next.js
    - CSS Modules for styling

## Tech Stack

### Backend

- Node.js with Express.js
- TypeScript
- External API integration (TheMealDB API)

### Frontend

- React.js
- TypeScript
- Next.js
- CSS Modules for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation and Setup

#### Backend Setup

1. Navigate to the **backend** directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file with the following content:

    ```env
    PORT=5000
    ```

4. Build and start the server:

    ```bash
    npm run build
    npm start
    ```

5. For development with hot-reload:

    ```bash
    npm run dev
    ```

#### Frontend Setup

1. Navigate to the **frontend** directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file with the following content:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. For production build:

    ```bash
    npm run build
    npm start
    ```

## API Endpoints

### Get Available Recipes

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes?ingredient=chicken_breast` - Filter by ingredient
- `GET /api/recipes?country=Canadian` - Filter by country
- `GET /api/recipes?category=Seafood` - Filter by category

### Get Recipe Info

- `GET /api/recipes/:id` - Get recipe details by ID

## Project Structure

```plaintext
project-root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── recipeController.ts
│   │   ├── routes/
│   │   │   └── recipeRoutes.ts
│   │   └── app.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── components/
│   │   ├── RecipeList.tsx
│   │   └── CategorySidebar.tsx
│   ├── pages/
│   │   ├── index.tsx
│   │   └── recipe/[id].tsx
│   ├── styles/
│   │   ├── globals.css
│   │   ├── Home.module.css
│   │   ├── RecipeList.module.css
│   │   ├── RecipeDetail.module.css
│   │   └── CategorySidebar.module.css
│   ├── types/
│   │   └── Recipe.ts
│   ├── package.json
│   ├── next.config.js
│   └── .env.local
│
└── README.md
