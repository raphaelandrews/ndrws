const Filter = () => {
    return (
        <svg
            id="texture"
            className="
                fixed
                top-0
                left-0
                w-screen
                h-screen
                pointer-events-none
                opacity-25
                filter
                brightness-[.2]
                contrast-[.8]
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
    );
}

export default Filter;