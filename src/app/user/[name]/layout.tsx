import { NavBar } from "@/components/home/Navbar";
import Jumbotron from "@/components/user/Jumbotron";
import Menu from "@/components/user/Menu";

export default async function UserLayout({ children, params }: { children: React.ReactNode; params: Promise<{ name: string }> }) {
  const { name } = await params;

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
      </header>
      <Jumbotron />
      <main className="w-[90%] h-screen mx-auto bg-black/30 shadow-2xl relative">
        <Menu name={name} />
        {children}
      </main>
    </>
  );
}
