import { getGitHubProjects } from "@/lib/github";

export default async function Projects() {
  const projects = await getGitHubProjects("Suryamahesh234"); // change to your username

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-6">
      <h1 className="text-3xl mb-6 animate-pulse">💻 My GitHub Projects</h1>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border border-green-500 p-4 rounded-lg hover:bg-green-900/30 transition">
            <h2 className="text-xl">{project.name}</h2>
            <p className="text-sm opacity-80">{project.description || "No description provided."}</p>
            <a href={project.html_url} target="_blank" className="underline text-green-300 hover:text-green-100">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
