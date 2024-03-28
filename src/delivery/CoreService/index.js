import connector from './connector';

import SectionActions from './SectionActions';
import ModificationActions from './ModificationActions';

class CoreService {
   connector = connector;
   SectionActions = SectionActions;
   ModificationActions = ModificationActions;
}

export default new CoreService();
