import Link from "@/components/Link";
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
        {" "}{"I'm"} interested in development, user experience and minimalistic
        things.
      </p>
      <section>
        <h2 className="text-primary font-bold mt-10">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Some things I built from scratch
        </p>
        <Link
          href="https://fsx.org.br"
          label="Federação Sergipana de Xadrez"
        />
        <Link
          href="https://timeline-portfolio.vercel.app"
          label=" Timeline Portfolio"
        />
        <Link
          href="https://fsx.org.br/nordestao"
          label=" Nordestão 2023"
        />
      </section>
      <section>
        <h2 className="text-primary font-bold mt-10">Clones Clones Clones</h2>
        <p className="text-sm text-muted-foreground">Some clones</p>
        <Link
          href="https://rentbnb-next.vercel.app"
          label="Airbnb"
        />
        <Link
          href="https://spotify-next-raphaelandrews.vercel.app"
          label="Spotify"
        />
        <Link
          href="https://twitter-next-raphaelandrews.vercel.app"
          label="Twitter"
        />
      </section>
    </main>
  )
}