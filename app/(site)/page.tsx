import HomeClient from "./home-client";


export default function Home() {
  return (
    <main
      className="
        flex
        justify-center
        items-center
        w-screen
        h-screen
        max-w-screen
        max-h-screen
        bg-background
        overflow-hidden
      "
    >
     <HomeClient/>
    </main>
  )
}