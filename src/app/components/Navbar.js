export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">My Portfolio</h1>
      <ul className="flex space-x-4">
        <li>Home</li>
        <li>Projects</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
