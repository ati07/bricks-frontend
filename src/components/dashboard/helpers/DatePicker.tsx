import {
    addDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    isSameWeek,
    isSameDay,
    isSameMonth,
    isYesterday,
    differenceInWeeks,
    differenceInDays,
} from 'date-fns';
import { Grid, Box, Typography, Stack, ButtonBase, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'

export const dateFormate = (date: any,formate:any) => {
    const startDate = new Date(date)
    const startdate = startDate.getDate() < 10 ? '0' + startDate.getDate().toString() : startDate.getDate().toString()
    const startMonth = startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1).toString()
    const startYear = startDate.getFullYear()
    let start_date;
    switch(formate){
        case 'YYYY-MM-DD':
            start_date = startYear + "-" + startMonth + '-' + startdate
            break;
        case 'MM-DD-YYYY':
            start_date = startMonth + '-' + startdate + "-" + startYear
            break;
        case 'MM/DD/YYYY':
            start_date = startMonth + '/' + startdate + "/" + startYear
            break;
        case 'DD/MM/YYYY':
            start_date = startdate + '/' + startMonth + "/" + startYear
            break;
    }
    return start_date
}
export const dateToHeading = (date1: any, date2: any) => {

    const dateLeft = new Date(date1);
    const dateRight = new Date(date2);
    const date = new Date();
    //  console.log("date",date1,date2)
    // if (date.getDate() === dateLeft.getDate()) {
    //     return "Today"
    // } else if (!isSameMonth(dateRight, date) && differenceInWeeks(dateLeft, dateRight) <= -3 && differenceInWeeks(dateLeft, dateRight) >= -4)
    //     return "Last Month"
    // else if (isSameMonth(dateRight, date) && differenceInWeeks(dateLeft, dateRight) <= -3 && differenceInWeeks(dateLeft, dateRight) >= -4)
    //     return "This Month"
    // else if (!isSameWeek(dateRight, date) && differenceInDays(dateLeft, dateRight) === -6 && differenceInDays(dateLeft, dateRight) < 0)
    //     return "Last Week"
    // else if (isSameWeek(dateRight, date) && differenceInDays(dateLeft, dateRight) === -6 && differenceInDays(dateLeft, dateRight) < 0)
    //     return "This Week"
    // else if (isYesterday(dateRight)) {
    //     return "Yesterday"
    // }
    // else new Date(date1).toDateString() new Date(date2).toDateString()
    return <Box style={{ display: 'flex' }} gap={1}>

        <Typography>{dateFormate(date1,'DD/MM/YYYY')}</Typography>
        <Typography> - </Typography>
        <Typography>{dateFormate(date2,'DD/MM/YYYY')}</Typography>
    </Box>

}
// To find the date range selected on side bar of date picker
const defineds = {
    today: new Date(),
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

// Creating below our custom side bar of date picker
const staticRangeHandler = {
    range: {},
    isSelected(range: any) {
        const definedRange = range;
        return (
            isSameDay(range.startDate, definedRange.startDate) &&
            isSameDay(range.endDate, definedRange.endDate)
        );
    },
};
export function createStaticRanges(ranges: any) {
    return ranges.map((range: any) => ({ ...staticRangeHandler, ...range }))
}

export const defaultStaticRanges = [
    {
        label: 'No Comparison',
        range: () => ({
            startDate: defineds.startOfToday,
            endDate: defineds.endOfToday,
        }),
    },
    {
        label: 'Yesterday',
        range: () => ({
            startDate: defineds.startOfYesterday,
            endDate: defineds.endOfYesterday,
        }),
    },

    {
        label: 'This Week',
        range: () => ({
            startDate: defineds.startOfWeek,
            endDate: defineds.endOfWeek,
        }),
    },
    {
        label: 'Last Week',
        range: () => ({
            startDate: defineds.startOfLastWeek,
            endDate: defineds.endOfLastWeek,
        }),
    },
    {
        label: 'This Month',
        range: () => ({
            startDate: defineds.startOfMonth,
            endDate: defineds.today,
        }),
    },
    {
        label: 'Last Month',
        range: () => ({
            startDate: defineds.startOfLastMonth,
            endDate: defineds.endOfLastMonth,
        }),
    },
];

export const defaultInputRanges = [];