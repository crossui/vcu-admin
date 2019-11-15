import { inputConf } from "./control/Input";
import { inputNumberConf } from "./control/InputNumber";
import { selectConf } from "./control/Select";
import { treeselectConf } from "./control/TreeSelect";
import { cascaderConf } from "./control/Cascader";
import { radioConf } from "./control/Radio";
import { checkBoxConf } from "./control/CheckBox";
import { textConf } from "./control/Text";
import { datePickerConf } from './control/DatePicker';
import { monthPickerConf } from './control/MonthPicker';
import { weekPickerConf } from './control/WeekPicker';
import { rangePickerConf } from './control/RangePicker';
import { timePickerConf } from './control/TimePicker';
import { datetimePickerConf } from './control/DateTimePicker';
import { rangetimePickerConf } from './control/RangeTimePicker';
import { addressConf } from './control/Address';
import { hrConf } from "./control/Hr";
import { switchonoffConf } from './control/Switch';
import { uploadstyleoneConf } from './control/UploadStyleOne';
import { uploadpicsConf } from './control/UploadPics';
import { titleConf } from './control/Title';
import { pConf } from './control/P';

const list_arr = {
    input: [{
            ele: "input",
            obj: inputConf
        },
        {
            ele: "inputNumber",
            obj: inputNumberConf
        },
        {
            ele: "text",
            obj: textConf
        }
    ],
    selection: [{
            ele: "radio",
            obj: radioConf
        },
        {
            ele: "checkbox",
            obj: checkBoxConf
        },
        {
            ele: "switchonoff",
            obj: switchonoffConf
        }
    ],
    select: [{
        ele: "select",
        obj: selectConf
    }, {
        ele: "address",
        obj: addressConf
    }, {
        ele: "cascader",
        obj: cascaderConf
    }, {
        ele: "treeselect",
        obj: treeselectConf
    }],
    datetime: [{
        ele: "datepicker",
        obj: datePickerConf
    }, {
        ele: "timepicker",
        obj: timePickerConf
    }, {
        ele: "monthpicker",
        obj: monthPickerConf
    }, {
        ele: "weekpicker",
        obj: weekPickerConf
    }, {
        ele: "rangepicker",
        obj: rangePickerConf
    }, {
        ele: "datetimepicker",
        obj: datetimePickerConf
    }, {
        ele: "rangetimepicker",
        obj: rangetimePickerConf
    }],
    upload: [{
        ele: "uploadstyleone",
        obj: uploadstyleoneConf
    }, {
        ele: "uploadpics",
        obj: uploadpicsConf
    }],
    other: [{
        ele: "hr",
        obj: hrConf
    }, {
        ele: "title",
        obj: titleConf
    }, {
        ele: "p",
        obj: pConf
    }]
};

export default list_arr;