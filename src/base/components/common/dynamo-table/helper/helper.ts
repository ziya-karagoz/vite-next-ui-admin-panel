// Helper function to find value by key, supporting nested objects
export function findValueByKey(row: any, key: string): any {
  const keys = key.split(".");
  return keys.reduce(
    (acc, k) => (acc && acc[k] !== undefined ? acc[k] : null),
    row
  );
}

// Generate URL function with updates
export function generateUrl(
  pathname: string,
  searchParams: URLSearchParams,
  updates: { [key: string]: string | undefined }
): string {
  const params = new URLSearchParams(searchParams);

  // Update the query parameters as per the updates provided
  for (const key in updates) {
    const value = updates[key];
    if (value !== undefined) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  return `${pathname}?${params.toString()}`;
}

