export async function handleApiCall<T>(
  apiCall: Promise<{ data: T }>
): Promise<T> {
  try {
    const response = await apiCall;
    return response.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      const errorMessage = Array.isArray(err.response.data.message)
        ? err.response.data.message[0]
        : err.response.data.message;
      throw new Error(errorMessage);
    } else {
      throw new Error("Ocorreu um erro inesperado. Tente novamente.");
    }
  }
}
