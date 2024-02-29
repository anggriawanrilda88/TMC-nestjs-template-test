export function getOffsetRows(page: number, perPage: number): number {
    return page < 1 ? 0 : (page - 1) * perPage;
}
