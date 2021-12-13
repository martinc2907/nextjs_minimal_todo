export const reactStrictMode = true
export const env = {
  ROOT:
    process.env.NODE_ENV === "production"
      ? "https://nextjs-minimal-todo.vercel.app/"
      : "http://localhost:3000",
}
