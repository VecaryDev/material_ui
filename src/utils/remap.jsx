export function map_range(value, low1, high1, low2, high2) {
    return Math.floor(low2 + ((high2 - low2) * (value - low1)) / (high1 - low1))
}

export function map_float_range(value, low1, high1, low2, high2) {
    return (low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)).toFixed(3)
}