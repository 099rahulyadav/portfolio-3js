import { Hero } from "@/components/home/hero";
import { IntroPreloader } from "@/components/home/intro-preloader";
import home from "@/content/home.json";
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col bg-black">
      <Hero {...home} />
      <IntroPreloader />
    </main>
  );
}
