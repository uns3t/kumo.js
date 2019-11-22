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
function Compile(el,vm) {
    this.$el=this.isElementNode(el)?el:document.querySelector(el)
    this.$vm=vm
    if(this.$el){
        this.$fragment=this.nodeFragment(this.$el)
        this.compileElemet(this.$fragment)
        this.$el.appendChild(this.$fragment)
    }
}
Compile.prototype={
    compileElemet:function (el) {
        let self=this
        let chilnode=el.childNodes;
        [].slice().call(chilnode).forEach(node=>{
            let text=node.textContent
            let reg = /\{\{((?:.|\n)+?)\}\}/
            if(self.isElementNode(node)){
                self.compile(node)
            }else if(self.isTextNode(node)&&reg.test(node)){
                self.compileText(node,RegExp.$1.trim())
            }
            if(node.chilnode&&node.chilnode.length){
                self.compileElemet(node)
            }
        })
    },
    nodeFragment:function (el) {
        let fragment=document.createDocumentFragment()
        let chil=null;
        while (chil=el.firstChild){
            fragment.appendChild(chil)
        }
        return fragment
    },
    compile:function (node) {
        let nodeAttr=node.attributes
        let self=this;
        [].slice().call(nodeAttr).forEach(attr=>{
            var attrName=attr.name
            if(self.isDrective(attrName)){
                var exp=attr.value
                var dir=attrName.substring(2)
                if(self.isEventDrective(dir)){
                    compileUnit.eventHandler(node,self.$vm,exp,dir)
                }else {
                    compileUnit[dir]&&compileUnit[dir](node,self.$vm,exp)
                }
            node.removeAttribute(attrName)
            }

        })
    },
    compileText:function (node,exp) {
        compileUnit.text(node,this.$vm,exp)
    },
    isElementNode:function (node) {
        return node.nodeType===1
    },
    isTextNode:function (node) {
        return node.nodeType===3
    },
    isDrective:function (attr) {
        return attr.indexOf('x-')===0
    },
    isEventDrective:function (dir) {
        return dir.indexOf('on')===0
    }
}
let $elm
let timer=null
const compileUnit={
    html:function (node,vm,exp) {
        this.bind(node,vm,exp,'html')
    },
    text:function () {
        this.bind(node,vm,exp,'text')

    },
    class:function () {
        this.bind(node,vm,exp,'class')

    },
    model:function () {
        this.bind(node,vm,exp,'model')

        let self=this
        let val=this._getVmVal(vm,exp)
        node.addEventListener('input',function (e) {
            let newVal=e.target.value
            $elm=e.target
            if(val===newVal){
                return
            }
            clearTimeout(timer)
            timer=setTimeout(function () {
                self._setVmVal(vm,exp,newVal)
                val=newVal
            })
        })

    },
    bind:function (node,vm,exp,dir) {
        let updaterFn=updater[dir+'Updater']
        updaterFn&&updaterFn(node,this._getVmVal(vm,exp))
        new Watcher(vm,exp,function (value,oldValue) {
            updaterFn&&updaterFn(node,value,oldValue)
        })
    },
    eventHandler:function (node,vm,exp,dir) {
        let eventType=dir.split(':')[1]
        let fn=vm.$options.methods&&vm.$options.methods[exp]
        if(eventType&&fn){
            node.addEventListener(eventType,fn.bind(vm),false)
        }
    },
    _getVmVal:function (vm,exp) {
        let val=vm
        exp=exp.split('.')
        exp.forEach(key=>{
            key=key.trim()
            val=val[key]
        })
        return val
    },
    _setVmVal:function (vm,exp,value) {
        let val=vm
        exp=exp.split('.')
        exp.forEach((key,index)=>{
            key=key.trim()
            if(index<exp.length-1){
                val=val[key]
            }else {
                val[key]=value
            }
        })
    }
}

const updater={
    htmlUpdater:function (node,value) {
        node.innerHTML=typeof value==='undefined'?'':value

    },
    textUpdater:function (node,value) {
        node.textContent=typeof value==='undefined'?'':value
    },
    classUpdater:function () {

    },
    modelUpdater:function (node,value,oldValue) {
        if($elm===node){
            return false
        }
        $elm=undefined
        node.value=typeof value==='undefined'?'':value

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
