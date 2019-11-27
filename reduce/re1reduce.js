const toReduce=function (fn,prev,index,arr) {
    if(arr.length===0)
        return prev

    index++
    let [head,...tail]=arr;
    return toReduce(fn,fn(prev,head,index,arr),index,tail)

}

Array.prototype.fakereduce=function (fn,initVal) {
    const self=this
    let [head,...tail]=self
    return initVal?toReduce(fn,initVal,-1,self):toReduce(fn,head,0,tail)
}

let test=[1,2,3,4].fakereduce(function (prev,cur) {
    return prev+cur
},1)
console.log(test)
