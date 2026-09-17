import { Projects } from "@/components/projects/projects-view";
import content from "@/content/projects.json";
export const metadata = {
  title: "Projects",
};
export default function ProjectsPage() {
  return (
    <main className="flex flex-1 flex-col bg-black pt-24">
      <Projects {...content} />
    </main>
  );
}
