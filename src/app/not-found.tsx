import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - User Not Found</h1>
      <p className="mb-4">Sorry, the user you{"'"}re looking for doesn{"'"}t exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to homepage
      </Link>
    </div>
  )
}

