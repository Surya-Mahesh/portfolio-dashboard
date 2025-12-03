export default function Card({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded p-4 m-2 hover:shadow-xl transition">
      <h2 className="font-bold text-lg">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
