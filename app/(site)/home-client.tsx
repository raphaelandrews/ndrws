'use client'

import useViewport from "@/hooks/useViewport";
import { Octahedron } from "@/assets/svg/Octahedron";
import Circuit from "@/components/Circuit";

const HomeClient = () => {
    const { viewportWidth, viewportHeight } = useViewport();

    const octahedronQuantityHorizontal = Math.ceil(viewportWidth / 58);
    const octahedronQuantityVertical = Math.ceil(viewportHeight / 58);

    const octahedronsHorizontal = Array.from(
        { length: octahedronQuantityHorizontal },
        (_, index) =>
            <div key={index} className="-m-[1px] opacity-40">
                <Octahedron width="60" height="60" />
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

    const circuits = Array.from(
        { length: 4 },
        (_, index) =>
            <div
                key={index}
                className="
                    relative
                    flex justify-center
                    after:content-[' ']
                    after:block
                    after:absolute
                    after:top-4
                    after:left-1/2 
                    after:w-[1px] 
                    after:h-6 
                    after:bg-orange
                    after:-translate-x-1/2
                    before:content-[' ']
                    before:block
                    before:absolute
                    before:top-2
                    before:-right-6 
                    before:w-6 
                    before:h-[1px] 
                    before:bg-orange
                    before:-translate-y-1/2
                "
            >
                <Circuit />
            </div>
    )

    const circuitsAlt = Array.from(
        { length: 4 },
        (_, index) =>
            <div
                key={index}
                className="
                    relative
                    flex justify-center
                    after:content-[' ']
                    after:block
                    after:absolute
                    after:top-4
                    after:left-1/2 
                    after:w-[1px] 
                    after:h-6 
                    after:bg-orange
                    after:-translate-x-1/2
                "
            >
                <Circuit />
            </div>
    )

    return (
        <div>
            <div>
                {octahedronsVertical}
            </div>
            <div
                className="
                    absolute
                    top-0
                    left-0
                    grid
                    grid-cols-3
                    w-screen
                    h-screen
                    max-w-screen
                    max-h-screen
                    p-10
                    overflow-hidden
                "
            >
                <p className="font-medium text-orange">ndrws system</p>

                <div className="flex gap-6">
                    <div className="flex flex-col gap-6">
                        {circuits}
                    </div>
                    <div className="flex flex-col gap-6">
                        {circuitsAlt}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomeClient;