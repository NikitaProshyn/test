import axios from 'axios';

class ApiConnector {
   connector;

   constructor() {
      this.connector = axios.create({
         baseURL: '/api',
      });
   }
}

export default new ApiConnector();
