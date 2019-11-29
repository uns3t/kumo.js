Object.prototype.fakeassign=function () {
    let len=arguments.length
    let target=arguments[0]
    if(len===0||target==null||target==undefined)
        throw new Error("assign args wrong")
    else if(len===1){
        if(target instanceof Object)
            return target
        else{
            let newObj =target;
            if(typeof target === 'string'){
                return new String(newObj);
            }else if(typeof target === 'boolean'){
                return new Boolean(newObj);
            }else if(typeof target === 'number'){
                return new Number(newObj);
            }
        }
    }else {
        for(let i=1;i<len;i++){
            for(let j in arguments[i]){
                if(arguments[i].hasOwnProperty(j))
                    target[j]=arguments[i][j]
            }
        }
    }
    return target
}

let a={}
let b=Object.fakeassign(a,{t:1,g:2})
console.log(b)
