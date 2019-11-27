Array.prototype.fakereduce=function (fn,base) {
    let self=this
    let arr=self.concat()
    if(base)
        arr.unshift(base)
    let index=-1;
    let newVal;
    while (arr.length>=2){
        index+=1
        newVal=fn.call(null,arr[0],arr[1],index,self)
        arr.splice(0,2)
        arr.unshift(newVal)
    }
    return newVal
}

let test=[1,2,3,4].fakereduce(function (prev,cur) {
    return prev+cur
},1)
console.log(test)

//第一版，其实和原生reduce有区别，因为原生的index当base存在时为0，不存在时为1
