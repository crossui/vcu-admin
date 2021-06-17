import IconFont from './IconFont';
import Scrollbar from './Scrollbar';
import EmbedPage from './EmbedPage';
import { Splitpanes, Pane } from './splitpanes';
import dateTime from './dateTime';
import fieldsetLegend from './fieldsetLegend';
import draggableResizable from './draggableResizable';
import spinLoading from './spinLoading';
import editCell from './editCell';

import autoTypewrit from '../busines/autoTypewrit';

const components = {
    IconFont,
    Scrollbar,
    EmbedPage,
    Splitpanes,
    Pane,
    dateTime,
    fieldsetLegend,
    draggableResizable,
    spinLoading,
    editCell,
    autoTypewrit
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => { Vue.component(key, components[key]); });
};
export default install;