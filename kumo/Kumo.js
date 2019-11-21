//数据劫持


function Observer(value) {
    this.value=value
    this.walk(value)
}

Observer.prototype={
    walk:function (obj) {
        let self=this
        self
    },
    observePrototype:function (obj,key,val) {

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

}
Dep.target=null
Dep.prototype={
    addSub:function () {

    },
    removeSub:function (sub) {

    },
    notify:function () {

    },
    depend:function () {

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
