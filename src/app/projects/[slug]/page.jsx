import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { NextProjectChain } from "@/components/projects/next-project-chain";
import projects from "@/content/projects.json";
import copy from "@/content/project-copy.json";
const studies = projects.projects.map((project) => ({ project, copy }));
export const dynamicParams = false;
export function generateStaticParams() {
  return studies.map(({ project }) => ({
    slug: project.slug,
  }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = studies.find(({ project }) => project.slug === slug);
  return {
    title: study?.project.name ?? "Project",
    description: study?.project.description,
  };
}
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = studies.findIndex(({ project }) => project.slug === slug);
  if (index === -1) notFound();
  const next = projects.projects[(index + 1) % studies.length];
  return (
    <main className="flex flex-1 flex-col bg-black">
      <ProjectCaseStudy {...studies[index]} />
      <NextProjectChain next={next} label="Next project" />
    </main>
  );
}
