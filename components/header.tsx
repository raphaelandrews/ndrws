import Image from "next/image";

const Header = () => {
    return (
        <header className="w-11/12 max-w-[700px] mx-auto my-0">
            <div className="flex justify-between items-center h-20">
                <div className="flex items-center">
                    <Image
                        className="w-8 cursor-pointer"
                        src="/logo.svg"
                        height="100"
                        width="100"
                        alt="Logo"
                    />
                </div>

                <div className="flex items-center gap-4">

                </div>
            </div>
        </header>
    );
}

export default Header;