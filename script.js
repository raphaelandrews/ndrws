function generateSlantedRectangles() {
    var container = document.getElementById("slanted-rectangles-container");

    container.innerHTML = "";

    var regularColumn = document.createElement("div");
    regularColumn.id = "regular-column";
    container.appendChild(regularColumn);

    var flippedColumn = document.createElement("div");
    flippedColumn.id = "flipped-column";
    container.appendChild(flippedColumn);

    // Generate 4 regular slanted rectangles
    for (var i = 0; i < 4; i++) {
        var rectangle = document.createElement("div");
        rectangle.className = "slanted-rectangle";
        regularColumn.appendChild(rectangle);
    }

    // Generate 4 horizontally flipped slanted rectangles
    for (var i = 0; i < 4; i++) {
        var rectangle = document.createElement("div");
        rectangle.className = "slanted-rectangle-flip";
        flippedColumn.appendChild(rectangle);
    }
}

generateSlantedRectangles();

function generatePattern() {
    const container = document.getElementById("patternContainer");
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let octagonSize = 96;

    if (viewportWidth <= 480) {
        octagonSize = 64;
    } else if (viewportWidth <= 768) {
        octagonSize = 80;
    }

    const cols = Math.floor((viewportWidth - 10) / (octagonSize - 1));
    const rows = Math.floor((viewportHeight - 10) / (octagonSize - 1));

    container.innerHTML = "";

    const totalOctagons = cols * rows;
    for (let i = 0; i < totalOctagons; i++) {
        const octagon = document.createElement("div");
        octagon.className = "octagon";

        if (octagonSize !== 96) {
            octagon.style.width = octagonSize + "px";
        }

        container.appendChild(octagon);
    }
}

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(generatePattern, 250);
});