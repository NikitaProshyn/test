import ApiConnector from '../connector';
import { apiRequestWrapper } from '@/helpers/delivery';

class SectionActions {
   getListByParentId = async (parentId) => {
      return await apiRequestWrapper(
         ApiConnector.connector.get(`/sections?parent_id=${parentId}`)
      );
   };
}

export default new SectionActions();
