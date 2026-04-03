// const currentYear = new Date().getFullYear(); // Get the current year

// export const weeks = Array.from({ length: 52 }, (_, i) => {
//     const weekNumber = i + 1;
//     const suffix = weekNumber === 1 ? "ra" : "da"; // "ra" for 1st, "da" for others
//     return `${weekNumber}${suffix}. Enero ${currentYear}`;
// });
const currentYear = new Date().getFullYear();

const suffixes = ["ra", "da", "ra", "ta", "ta", "ta", "ma", "va", "na", "ma"]; // For 1-10
const getSuffix = (num:any) => num <= 10 ? suffixes[num - 1] : "ta"; // After 10, most use "ta"

export const weeks = Array.from({ length: 52 }, (_, i) => {
    const weekNumber = i + 1;
    // return `${weekNumber}${getSuffix(weekNumber)}. Enero ${currentYear}`;
    return weekNumber
});