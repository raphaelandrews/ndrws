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