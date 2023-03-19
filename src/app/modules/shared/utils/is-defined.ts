export function isDefined<T>(value: unknown): boolean {
    return value !== null && value !== undefined;
}
