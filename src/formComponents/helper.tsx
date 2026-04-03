export function TitleformatString(str:any) {
    return str
      .replace(/(\B)[^ ]*/g, (match:any) => (match.toLowerCase()))
      .replace(/^[^ ]/g, (match:any) => (match.toUpperCase()));
    
  }
export function formatString(str:any) {
    return str
      .split(' ')
      .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

export const convertFormate =(number:any)=>{
    let data = new Intl.NumberFormat('en-US',{minimumFractionDigits: 2,
      maximumFractionDigits: 2,}).format(number)
    return data
}
  