export const apiRequestWrapper = async (request, successStatusCode = 200) => {
   const result = {
      value: false,
      error: null,
   };

   try {
      const response = await request;

      if (response.status !== successStatusCode) {
         const error = new Error(`API error, status: ${response.status}.`);
         error.response = response;
         throw error;
      }

      if (
         !response?.data?.data?.length &&
         response?.status !== 202 &&
         response?.status !== 204
      ) {
         throw new Error(`API returned an empty response`);
      }

      result.value = response?.data?.data;
   } catch (e) {
      const errorMessage = e?.response?.data?.message;

      result.error =
         errorMessage || e.message || 'Network error, try again late';
   }

   return result;
};
