# Marvel Profiles: A Dashboard for Marvel Fans

**Marvel Profiles** is a dashboard where fans can explore Marvel characters. This project is built using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vite.dev/).

## Prerequisites

- Install [Node.js](https://nodejs.org/) (version >= 20.12.2).

## Quick Start

To set up the project locally:

1. **Clone this repository**
2. Create a .env file in the root folder and add the following environment variables:

```
VITE_REACT_APP_MARVEL_PUBLIC_API_KEY="<Your_MARVEL_PUBLIC_API_KEY>"
VITE_REACT_APP_MARVEL_PRIVATE_API_KEY="<Your_MARVEL_PRIVATE_API_KEY>"
VITE_REACT_APP_MARVEL_API_PATH="https://gateway.marvel.com:443"
```

3. Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

4. Open localhost:5173 to view the application in your browser.

## Pages

- Home Page

  - Displays a list of Marvel characters.
  - Supports infinite scrolling to load additional characters.

- Character Detail Page
  - Click "Read More" on any character row to view detailed information about that character.
  - Use the breadcrumb link to return to the Home page

## Libraries Used

- State Management: SWR
- HTTP Client: Axios
- Routing: React Router Dom

## Styling

- CSS Framework: [TailwindCSS](<(https://tailwindcss.com/)>)
- Component Library: [Material Tailwind](<(https://www.material-tailwind.com/)>)

## Linting and Formatting

- Linting: Configured with ESLint
- Formatting: Configured with Prettier
- Tailwind Class Sorting: Automatic class sorting with [Prettier plugin for Tailwind CSS](<(https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)>)
