export function isMongoId(id: string): boolean {
  return new RegExp('^[0-9a-fA-F]{24}$').test(id);
}
