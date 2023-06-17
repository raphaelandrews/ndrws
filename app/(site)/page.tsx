import Section from "@/components/section";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "@/components/logo";

import { projects, clones, social } from "@/data/links";

export default function Home() {
  return (
    <main className="p-12 bg-background">
      <section>
        <div className="flex items-center gap-2">
          <Logo />
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
      </section>
      <Section title="Themes" subtitle="Choose wisely">
        <ModeToggle />
      </Section>
      <Section
        title="Projects"
        subtitle="Some things I built from scratch"
        links={projects}
      />
      <Section
        title="Attack of the clones"
        subtitle="Some clones"
        links={clones}
      />
      <Section
        title="Social"
        subtitle="My social links"
        links={social}
      />
    </main >
  )
}