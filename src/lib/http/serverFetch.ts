import "server-only";

export const serverFetch = async <T>(
  path: string,
  options?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json() as Promise<T>;
};
