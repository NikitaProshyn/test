import ApiConnector from '@/delivery/CoreService/connector'

import { apiRequestWrapper } from '@/helpers/delivery'

export default class CatalogActions {
  getList = async query => {
    const params = {}

    if (query.search) {
      params.s = query.search
    }

    if (query.page) {
      params.page = query.page
    }

    return await apiRequestWrapper(
      ApiConnector.connector.get(
        'https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8',
        { params }
      )
    )
  }
}
