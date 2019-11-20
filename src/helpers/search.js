import {elasticsearch} from elasticsearch

export const client = new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace"
})

export const eSearch= async (duration)=>{
    try {
         const ping = await client.ping({requestTimeout: duration})
         console.log('search engine working okay')
    } catch (error) {
              console.log(error)
        }
}     
    
    
export const Index = (name)=>{
    client.indices.create(
        {
        index:name
        }, 
        (error)=>{
            if (error) {
                console.log(error);
            } else {
                console.log("created a new index");
            }
        })
}

// function to handle page number for offset
export const trueOffset = (pagenumber)=>{
    let page = pagenumber
    if (page>=2){
        tOffset = (page-1)*10
        return tOffset
    }
    return page;   
}
