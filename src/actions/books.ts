import useSWR, { mutate } from "swr";
import { IBook } from "../interfaces/IBook";

interface AddBookOptions {
  onSuccess?: () => void;
  onError?: (error: Error | unknown) => void;
}

const API_ENDPOINT = `${import.meta.env.VITE_HOST_URL}:${import.meta.env.VITE_PORT}/books`;

const fetcher = async (url: string): Promise<IBook[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const globalSWRConfig = {
  fetcher,
  revalidateOnFocus: true,
};

export const updateBook = async (
  bookId: number,
  updatedData: Partial<IBook>,
  options?: AddBookOptions
): Promise<IBook> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update book");
    }

    const data = await response.json();
    mutate(API_ENDPOINT);

    // Call onSuccess callback if provided
    options?.onSuccess?.();

    return data;
  } catch (error) {
    // Call onError callback if provided
    options?.onError?.(error);

    // Re-throw the error for the caller to handle
    throw error;
  }
};

export const addBook = async (
  newBook: Partial<IBook>,
  options?: AddBookOptions
): Promise<IBook> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    const data = await response.json();
    mutate(API_ENDPOINT);

    // Call onSuccess callback if provided
    options?.onSuccess?.();

    return data;
  } catch (error) {
    // Call onError callback if provided
    options?.onError?.(error);

    // Re-throw the error for the caller to handle
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  await fetch(`${API_ENDPOINT}/${bookId}`, {
    method: "DELETE",
  });

  mutate(API_ENDPOINT);
};

export const useBookSWR = (bookId?: number) => {
  const url = `${API_ENDPOINT}`;

  const { data: books, error } = useSWR<IBook[]>(url, globalSWRConfig);

  if (!books && !error) {
    return { book: undefined, isLoading: true };
  }

  if (error) {
    return { book: undefined, error, isLoading: false };
  }

  const specificBook = bookId ? books?.find((book) => book.id === bookId) : undefined;

  return { book: specificBook, isLoading: false };
};

export const useBooksSWR = (bookId?: number) => {
  const url = bookId ? `${API_ENDPOINT}/${bookId}` : API_ENDPOINT; //if bookId is provided, fetch a single book, otherwise fetch all books
  return useSWR<IBook[]>(url, globalSWRConfig);
};
