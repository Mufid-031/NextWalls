export default function JumbotronLayout({ children, backgroundImage }: { children: React.ReactNode; backgroundImage: React.ReactNode }) {
  return (
    <div className="relative w-full h-[500px]">
      {backgroundImage}
      <div className="absolute inset-0 bg-black/30 w-[90%] mx-auto mt-28">
        <div className="container mx-auto h-full">
          <div className="flex flex-col justify-between h-full p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
