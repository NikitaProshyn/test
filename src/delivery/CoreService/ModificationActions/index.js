import ApiConnector from '../connector';
import { apiRequestWrapper } from '@/helpers/delivery';

class ModificationActions {
   getListBySectionId = async (sectionId) => {
      return await apiRequestWrapper(
         ApiConnector.connector.get(`/modifications?section_id=${sectionId}`)
      );
   };
}

export default new ModificationActions();
