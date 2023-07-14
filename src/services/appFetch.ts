export interface ApiResponse<T, E> {
  data: T | null;
  error: E | null;
  loading: boolean;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const appFetch = async <T, E>(
  url: string,
  method: RequestMethod = 'GET',
  body?: object
): Promise<ApiResponse<T, E>> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const jsonData = await response.json();
    return { data: jsonData, error: null, loading: false };
  } catch (error) {
    return { data: null, error: error as E, loading: false };
  }
};
