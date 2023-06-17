
import { ISection } from "@/types/global";
import Link from "./link";

const Section = ({ title, subtitle, links, children }: ISection) => {
    return (
        <section className="mt-6">
            <h2 className="text-lg text-primary font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">
                {subtitle}
            </p>

            {links?.map((item, index) => (
                <Link key={index} href={item.href} label={item.label} />
            ))}
            {children}
        </section>
    );
}

export default Section;
