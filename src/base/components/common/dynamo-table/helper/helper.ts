// define a helper function to finds the value of like this:
// item[columnKey]
// but note that the row data can have nested objects
// so that the method shoiuld be able to handle nested objects

export function findValueByKey(row: any, key: string) {
  const keys = key.split(".");
  let value = row;
  keys.forEach((k) => {
    value = value[k];
  });
  return value;
}

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