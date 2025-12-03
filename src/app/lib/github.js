export async function getGitHubProjects(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}
