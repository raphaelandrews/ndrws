import { Octahedron } from "@/assets/svg/Octahedron";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen max-w-screen max-h-screen bg-background">
      <div className="flex justify-center items-center">
        <Octahedron width="64" height="64" />
      </div>
    </main>
  )
}
