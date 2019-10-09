interface IPriceData {
    /** 标识 */
    cbf:string
    /** id */
    id:string
    /** 市场价格 */
    m:string
    /** 后台价 */
    op:string
    /** 前台价 */
    p:string
}
type IPriceDataArray = Array<IPriceData>
function getPrice(){
    return new Promise<IPriceDataArray>(function(resolve,reject){
        resolve([{cbf:"1",id:"2",m:"3",op:"4",p:"6"}])
    })
}
getPrice().then(function(data){
    const a = data[0].cbf;
})