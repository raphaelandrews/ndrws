interface ILink {
    href: string;
    label: string;
}

const Link = ({ href, label }: ILink) => {
    return (
        <a
            href={href}
            className="block text-primary py-2 hover:underline"
            target="_blank"
        >
            {label}
        </a>
    );
}

export default Link;