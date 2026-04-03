import React from 'react'
import WorldMap from "react-svg-worldmap";
import type { CountryContext, Data } from "react-svg-worldmap";
import countryCode from './country_code.json'
import { Text, Flex, useColorModeValue, Box } from '@chakra-ui/react';
import Card from '../../components/common/card/Card';
// import Card from "";
// import { Text } from 'recharts';
function WorldMapChart({ dataCountry }: any) {
    // const data = [
    //     { country: "cn", value: 1389618778 }, // china
    //     { country: "IN", value: 1311559204 }, // india
    //     { country: "us", value: 331883986 }, // united states
    //     { country: "id", value: 264935824 }, // indonesia
    //     { country: "pk", value: 210797836 }, // pakistan
    //     { country: "br", value: 210301591 }, // brazil
    //     { country: "ng", value: 208679114 }, // nigeria
    //     { country: "bd", value: 161062905 }, // bangladesh
    //     { country: "ru", value: 141944641 }, // russia
    //     { country: "mx", value: 127318112 }, // mexico
    // ];
    // const dataObj:any = {}
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const data: any = []
    const cdata: any = {...countryCode}
    // for (let key in countryCode){
    //     dataObj[cdata[key]] = key
    // }
    // console.log('cdata',cdata)
    for (let key in dataCountry) {
        // console.log('`${key}`.toUpperCase()',key,`${key}`.toUpperCase())
        // cdata[`${key}`.replace(/^./, key[0].toUpperCase())]console.log('{ country: dataObj[key], value: dataCountry[key] }',{ country: cdata[key], value: dataCountry[key] })
        data.push({ country: cdata[key] ?? '', value: dataCountry[key] })
    }
    // console.log('dataObjdata',countryCode,data,dataCountry)
    const getStyle = ({
        countryValue,
        countryCode,
        minValue,
        maxValue,
        color,
    }: CountryContext) => {
        // console.log("max,min",minValue,maxValue);

        return {
            fill: color,
            fillOpacity: countryValue
                ? 0.2 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
                : 0.1,
            stroke: "#4b1cf8",
            strokeWidth: 1,
            strokeOpacity: .2,
            cursor: "pointer",
        }
    };
    //   countryCode === "US" ? "blue" : #F37021#233044
    // console.log('Wdata',data)
    return (
        <Card align='center' direction='column' w='100%'
        // {...rest}
        >
            <Flex align='center' w='100%' px='15px' py='10px'>
                <Text
                    me='auto'
                    color={textColor}
                    fontSize='lg'
                    fontWeight='700'
                    lineHeight='100%'>
                    {/* Chargebacks per Country */}
                </Text>
            </Flex>

            <Box h='auto' mt='auto'>
                {data.length > 0 ?
                <WorldMap
                    color="#4b1cf8"
                    // title="Charge backs per Country"
                    // value-suffix="people"
                    size="lg"
                    data={data}
                    styleFunction={getStyle}
                />:null}
            </Box>
        </Card>
        // <Card
        // align='center' direction='column' w='100%' 
        // // {...rest}
        //     // direction='column'
        //     // w='100%'
        //     // px='0px'
        //     // overflowX={{ sm: "scroll", lg: "hidden" }}
        //     >
        //     <Flex 
        //     align='center' w='100%' px='15px' py='10px'
        //     // px='25px' 
        //     // justify='space-between' 
        //     // mb='10px' 
        //     // align='center'
        //     >
        //         <Text
        //             color={textColor}
        //             fontSize='22px'
        //             fontWeight='700'
        //             lineHeight='100%'
        //             >
        //             Charge backs per Country
        //         </Text>
        //         {/* <Menu /> */}
        //     </Flex>
        //     <Box h='240px' mt='auto'>
        // {/* <WorldMap
        //     color="#4b1cf8"
        //     // title="Charge backs per Country"
        //     value-suffix="people"
        //     size="md"
        //     data={data}
        //     styleFunction={getStyle}
        // /> */}
        //     </Box>
        // </Card>
        // <div>
        //     {/* <div>World Map</div> */}
        //     <div>
        //         <WorldMap
        //             color="#4b1cf8"
        //             // title="Charge backs per Country"
        //             value-suffix="people"
        //             size="sm"
        //             data={data}
        //             styleFunction={getStyle}
        //         />
        //     </div>
        // </div>
    )
}

export default WorldMapChart