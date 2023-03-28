export function calc(a: number, b: number, op: string): number | undefined {
    switch (op) {
        case '+':
            return a + b
        case '-':
            return a - b
        case 'x':
            return a * b
        case '/':
            return a / b
        default:
            return undefined
    }
}