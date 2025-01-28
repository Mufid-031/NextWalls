import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import UserProfile from "./UserProfile";

async function getUserProfile({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const user = await prisma.user.findFirst({
    where: { name },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export default async function UserProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const user = await getUserProfile({ params });

  return <UserProfile name={user.name} />;
}