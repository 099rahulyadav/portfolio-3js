import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-content-center gap-6 bg-black px-6 text-center text-white">
      <p className="font-mono text-sm tracking-widest text-blue-400">
        404 / NOT FOUND
      </p>
      <h1 className="text-5xl">This page doesn’t exist.</h1>
      <Link href="/" className="underline underline-offset-8">
        Back to home
      </Link>
    </main>
  );
}
