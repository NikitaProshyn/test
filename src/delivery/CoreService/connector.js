import axios from 'axios'
class ApiConnector {
  connector

  constructor() {
    this.connector = axios.create({
      baseURL: '',
    })
  }
}

export default new ApiConnector()
