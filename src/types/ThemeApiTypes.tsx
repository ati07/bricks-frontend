export interface themeApiType {
    [key: string]: any;
}
export interface SizeObject {
    [key:string]:number
  }

export interface LayoutSettingType {
    index?: number| string;
    id: string;
    layoutValidation?:boolean;
    data:{
        [key: string]:any
    }
}
export interface UploadSettingType {
    id: string;
    uploadValidation?:boolean;
    data:{
        [key: string]:any
    }
}
export type typeOfComponents={
    props?: any
    index?: number
    validated?: boolean
    hidden?:boolean
    branding?:boolean
}