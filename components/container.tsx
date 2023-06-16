interface IContainer {
    children: React.ReactNode;
}

const Container = ({ children }: IContainer) => {
    return (
        <section className="w-11/12 max-w-[700px] mx-auto my-0">
            {children}
        </section>
    );
}

export default Container;