export async function handleApiCall<T>(
  apiCall: Promise<{ data: T }>
): Promise<T> {
  try {
    const response = await apiCall;
    return response.data;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.message || "Erro inesperado";
    throw { status, message };
  }
}