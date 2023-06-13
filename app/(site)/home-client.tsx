'use client'

import useViewport from "@/hooks/useViewport";
import { Octahedron } from "@/assets/svg/Octahedron";
import { useEffect } from "react";

const HomeClient = () => {
    const { viewportWidth, viewportHeight } = useViewport();

    const octahedronQuantityHorizontal = Math.ceil(viewportWidth / 62);
    const octahedronQuantityVertical = Math.ceil(viewportHeight / 62);

    const octahedronsHorizontal = Array.from(
        { length: octahedronQuantityHorizontal },
        (_, index) =>
            <div key={index} className="-m-[1px]">
                <Octahedron key={index} width="64" height="64" />
            </div>
    );

    const octahedronsVertical = Array.from(
        { length: octahedronQuantityVertical },
        (_, index) => (
            <div key={index} className="flex justify-center">
                {octahedronsHorizontal}
            </div>
        )
    );

    useEffect(() => {

    }, [])

    return (
        <div className="flex flex-col">
            {octahedronsVertical}
        </div>
    )
}

export default HomeClient;