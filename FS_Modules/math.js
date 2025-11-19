function findAreaOfCircle(radius) {
    // Formula: A = pi * r square

    let pi = 3.14;
    return pi * (radius * radius)
}

function findAreaOfTriangle(base, height) {
    // Formula: A = 0.5 * base * height

    return 0.5 * (base * height)
}

function findAreaOfRectangle(a, b, c) {
    return (a + b + c) / 2
}

function findAreaOfSquare(side) {
    // Formula: A = s square

    return side * side
}

module.exports = {
    findAreaOfCircle,
    findAreaOfTriangle,
    findAreaOfRectangle,
    findAreaOfSquare
};