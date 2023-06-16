import Image from "next/image";

export default function Home() {
  return (
    <main className="p-12 bg-background">
      <div className="flex items-center gap-2">
        <Image
          className="w-6 cursor-pointer"
          src="/logo.svg"
          height="40"
          width="40"
          alt="Logo"
        />
        <h1 className="text-lg text-primary font-bold">ndrws</h1>
      </div>
      <p className="text-primary mt-10">👋 Hello.</p>
      <p className="text-primary  max-w-[600px] mt-4">
        {"I'm"} Raphael Andrews, a fullstack developer specialized in frontend
        based in Aracaju who likes to build amazing things on the web. I use 🧨
        TNT as my core stack, also know as Next.js, Typescript and Tailwind.
        {"I'm"} interested in development, user experience and minimalistic
        things.
      </p>
      <div>
        <svg
          id="texture"
          className="
            fixed
            top-0
            left-0
            w-screen
            h-screen
            opacity-25
            filter
            brightness-[.7]
            contrast-[.3]
          "
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".8"
              numOctaves="4"
              stitchTiles="stitch"
            >
            </feTurbulence>
            <feColorMatrix type="saturate" values="0">
            </feColorMatrix>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)">
          </rect>
        </svg>
      </div>
    </main>
  )
}