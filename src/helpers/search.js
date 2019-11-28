// function to handle page number for offset
export const trueOffset = (pagenumber)=>{
    let page = pagenumber
    if (page>=2){
        tOffset = (page-1)*10
        return tOffset
    }
    return page;   
}

export default trueOffset;
