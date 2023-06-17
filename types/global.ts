export interface ILink {
    href: string;
    label: string;
}

export interface ISection {
    title: string;
    subtitle: string;
    links?: ILink[];
    children?: React.ReactNode
}

export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
        linkedin: string
        github: string
    }
}