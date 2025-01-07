export default function Card({ icon, title, desc }: { icon: React.ReactNode; title: string, desc: string }) {
  return (
    <div className="w-full h-20 bg-white rounded-md flex items-center p-5 gap-4">
      {icon}
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{desc}</p>
      </div>
    </div>
  );
}
