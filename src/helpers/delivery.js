export const apiRequestWrapper = async (request, successStatusCode = 200) => {
  const result = {
    value: false,
    error: null,
  }

  try {
    const response = await request

    if (response.status !== successStatusCode) {
      const error = new Error(`API error, status: ${response.status}.`)
      error.response = response
      throw error
    }

    result.value = response?.data
  } catch (e) {
    const errorMessage = e?.response?.data?.message

    result.error = errorMessage || e.message || 'Network error, try again late'
  }

  return result
}
