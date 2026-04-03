import AddItemDropDown from "./AddItemDropDown/AddItemDropDown";
import DatePickers from "./DatePicker/DatePickers";
import DropDown from "./DropDown/DropDown";
import Input from "./Input/Input";
import MultipleSelect from "./MultipleSelect/MultipleSelect";
import SelectCountry from "./SelectCountry/SelectCountry";
import TextArea from "./TextArea/TextArea";


export const formComponent:any={
    Input:{
        component:Input
    },
    DropDown:{
        component:DropDown
    },
    Date:{
        component:DatePickers
    },
    MultipleSelect:{
        component:MultipleSelect
    },
    SelectCountry:{
        component:SelectCountry
    },
    TextArea:{
        component:TextArea
    },
    AddItemDropDown:{
        component:AddItemDropDown
    }

}