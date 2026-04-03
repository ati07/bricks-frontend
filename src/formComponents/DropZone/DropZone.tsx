import { Progress } from "@chakra-ui/react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./d.css";
import { useCreateMutation, useGetDataQuery } from "../../redux/ApiHandler/ThemeApi";
import { closeLoader } from "../../redux/loader/loaderSlice";
import { openSnackbar } from "../../redux/snackbar/snackbarSlice";
import { useDispatch } from "react-redux";
// import csvToJson from 'convert-csv-to-json'
import csvToJson from 'csvtojson';
// import reader from 'xlsx'



export default function DropZone({component,type,onCallback,insertData}:any) {
  const [file, setFile] = useState<any>();
  const [array, setArray] = useState([]);
  const [create] = useCreateMutation()
  const { refetch } = useGetDataQuery('/chargebacks')
  const dispatch = useDispatch()
  const fileTypes = (component=='fightChargebacks'|| component=='refundEthoca') ?["PNG","JPEG"]:["CSV"];
  const fileReader = new FileReader();
  const handleChange = async (file: any) => {
    setFile(file);
    // let json = csvToJson.parseSubArray('*',',').getJsonFromCsv(file[0]);
    // const array = await csvToJson().fromFile(file[0]);

    // console.log("csvarray",array);
    if(component=='fightChargebacks' || component=='refundEthoca'){
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.addEventListener("load", () => {
        const imageUrl = reader.result;
        onCallback({type:type,file:imageUrl})
      })
    }else if(component=='importfile'){
      handleOnSubmit(file[0])
    }
    // console.log('file',file[0].value,file[0],json)
    // const reader = new FileReader();

    // reader.onload = () => {
    //   const fileAsBinaryString = reader.result;

    //   csvToJson({
    //     noheader: true,
    //     trim: true,
    //     output: "json"
    //   })
    //     .fromString(fileAsBinaryString as any)
    //     .then((csvRows: any) => {
    //       const toJson: any = []
    //       console.log("csvRows[0]", csvRows[0])
    //       csvRows.forEach((aCsvRow: any, i: any) => {


    //         if (i !== 0) {
    //           const builtObject: any = {}

    //           Object.keys(aCsvRow).forEach((aKey) => {
    //             const valueToAddInBuiltObject = aCsvRow[aKey];
    //             const keyToAddInBuiltObject = csvRows[0][aKey];
    //             builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
    //           })

    //           toJson.push(builtObject)
    //         }


    //       })
    //       // this.props.onDrop(toJson)
    //       console.log('JSOSN', toJson)
    //     })

    // };

    // reader.onabort = () => console.log('file reading was aborted');
    // reader.onerror = () => console.log('file reading has failed');

    // reader.readAsBinaryString(file[0]);

  };
  const csvFileToArray = async (string: any) => {
    console.log('string', string)
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    // console.log('csvHeadercsvRows',csvHeader.map((i:any)=>JSON.parse(i)),csvRows)
    console.log('csvHeadercsvRows',csvHeader)
    // ,csvHeader.map((i:any)=>JSON.parse(i)),
    // csvRows.map((i:any)=>JSON.parse(i)))

    // const array = csvRows.map((i: any) => {
    //   const values = i.split(",");
    //   const obj = csvHeader.reduce((object: any, header: any, index: any) => {
    //     let str = values[index];

    //     if (str.at(0) === '"' && str.at(-1) === '"') {
    //       str = str.slice(1, -1);
    //     }
    //     // let strHeader = header
    //     // if (strHeader.at(0) === "'" && strHeader.at(-1) === "'") {
    //     //   strHeader = strHeader.slice(1, -1);
    //     // }
    //     object[header] = str;
    //     return object;
    //   }, {});
    //   return obj;
    // });
    function objectCreate(arrA:any, arrB:any) {
      const result:any = [];

      arrB.forEach((element:any) => {
        const values = element.split(',');
        const obj:any = {};
        arrA.forEach((key:any, index:number) => {
          key = key.replace(/"/g, '').replace(' ', '_').toLowerCase();
          obj[key] = values[index].replace(/"/g, '').trim();
        });
        console.log("insertData",insertData)
        result.push({...obj,...insertData});
      });
      // console.log("result",result)
      return result;
    }
    const array = objectCreate(csvHeader,csvRows)
    setArray(array);
    console.log('array', typeof array, array)
    onCallback(array)
  };
  //   function csvToArray(str:any, delimiter = ",") {
  //     let array = str.split("\\r\\n").map(function (line:any) {
  //         return line.split(delimiter);
  //     });
  //     console.log('csvToArray',array)
  //     return array;
  // }
  const handleOnSubmit = (file: any) => {
    // e.preventDefault();

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        // csvToArray(text)
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };
  const headerKeys = Object.keys(Object.assign({}, ...array));
  // const change=(event)=>{
  //  console.log('event',event.target.value)
  // }
  return (
    <div style={{ paddingLeft:'10px',width: '100%' }}>
      {/* <h1>Hello To Drag & Drop Files</h1> */}
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        sx={{ maxWidth: '100%' }}
      />
      <p style={{ marginTop: '10px' }}>{file ? `File name: ${file[0]?.name}` : "no files uploaded yet"}</p>
      <Progress hasStripe value={64} />
      {/* <input value='' type='file' onChange={change} accept="file_extension|audio/*|video/*|image/*|media_type"/> */}

      {/* <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item: any) => (
            <tr key={item.id}>
              {Object.values(item).map((val: any) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
