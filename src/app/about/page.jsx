import { AboutView } from "@/components/about/about-view";
import about from "@/content/about.json";
export const metadata = {
  title: "About",
};
export default function AboutPage() {
  return <AboutView {...about} />;
}
