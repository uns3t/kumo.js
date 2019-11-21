//数据劫持


function Observer(value) {
    this.value=value
    this.walk(value)
}

Observer.prototype={
    walk:function (obj) {
        let self=this
        Object.keys(obj).forEach((key)=>{
            self.observePrototype(obj,key,obj[key])
        })
    },
    observePrototype:function (obj,key,val) {
        let dep=new Dep()
        let chalnode=observe(val)
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get:function () {
                if(Dep.target){
                    dep.depend()
                }
                if(chalnode){
                    chalnode.dep.depend()
                }
                return val
            },
            set:function (newVal) {
                if(newVal===val||(newVal!==newVal&&val!==val)){
                    return
                }
                val=newVal
                chalnode=observe(newVal)
                dep.notify()
            }

        })
    }

}

function observe(val) {
    if(!val||typeof val!=='object'){
        return
    }

    return new Observer(val)
}

let uid=0

function Dep() {
    this.uid++
    this.subs=[]
}
Dep.target=null
Dep.prototype={
    addSub:function (sub) {
        this.subs.push(sub)
    },
    removeSub:function (sub) {
        let index=this.subs.indexOf(sub)
        if(index!=-1){
            this.subs.splice(index,1)
        }
    },
    notify:function () {
        this.subs.forEach(sub=>{
            sub.update()
        })
    },
    depend:function () {
        Dep.target.addDep(this)
    }

}

//指令解析
function Compile() {

}
Compile.prototype={
    compileElemet:function () {

    },
    nodeFragment:function () {

    },
    compile:function () {

    },
    compileText:function () {

    },
    isElementNode:function () {

    },
    isTextNode:function () {

    },
    isDrective:function () {

    },
    isEventDrective:function () {

    }
}
let $elm
let timer=null
const compileUnit={
    html:function () {

    },
    text:function () {

    },
    class:function () {

    },
    model:function () {

    },
    bind:function () {

    },
    eventHandler:function () {

    },
    _getVmVal:function () {

    },
    _setVmVal:function () {

    }
}

const updater={
    htmlUpdate:function () {

    },
    textUpdate:function () {

    },
    classUpdate:function () {

    },
    modelUpdate:function () {

    }
}


//watcher
function Watcher() {

}
Watcher.prototype={
    updata:function () {

    },
    run:function () {

    },
    get:function () {

    },
    addDep:function () {

    },
    parseGetter:function () {

    }
}

//
function Kumo() {

}
Kumo.prototype={
    _proxyData:function () {

    }
}
