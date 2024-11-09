if (!import.meta.env.VITE_REACT_APP_MARVEL_API_PATH) {
  throw new Error("ERROR API_PATH not found please create your .env file");
}
if (
  !import.meta.env.VITE_REACT_APP_MARVEL_PUBLIC_API_KEY ||
  !import.meta.env.VITE_REACT_APP_MARVEL_PRIVATE_API_KEY
) {
  throw new Error("ERROR API_KEY not found please create your .env file");
}
export const MARVEL_API_PATH = import.meta.env.VITE_REACT_APP_MARVEL_API_PATH!;
export const MARVEL_API_KEY = import.meta.env
  .VITE_REACT_APP_MARVEL_PUBLIC_API_KEY!;
export const MARVEL_API_HASH = `${import.meta.env.VITE_REACT_APP_MARVEL_PRIVATE_API_KEY!}${import.meta.env.VITE_REACT_APP_MARVEL_PUBLIC_API_KEY!}`;
