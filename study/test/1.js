var a = (function () {
    var count = 0;
    return function (msg) {
        msg = msg || '加载中....';
        var w;
        if (mui.os.plus) {
            w = plus.nativeUI.showWaiting(msg);
            showShade();
            count++;
        } else {
            if (!Vue || !(new Vue().$toast)) { return { close: function () { } } };
            w = new Vue().$toast.loading({
                duration: 0,
                forbidClick: true,
                loadingType: 'circular',
                message: msg,
                mask: true
            });
            w.close = w.clear;
            count++;
        }
        return {
            close: function () {
                count--;
                if (count == 0) {
                    if ($.isFunction(w.close)) {
                        w.close();
                    }
                    closeShade();
                    w = null;
                }
            }
        }
    }
})()
setTablelistMulitValue:function(data){
    var vm = this;
    var parent = this.findParent(this,'comp-sheet-item');
    var sheetName = parent.sheetName;
    var actionname = parent.aname;
    var forms = this.$store.getters.sheetsField[sheetName];
    var lookup_value = data.valueJson;
    var tablelist = [];
    var prop = {};
    var reflectKey = "";
    for(var i = 0;i<lookup_value.length;i++){
        tablelist[i]= {};
        for(var key in this.lookupFields) {
            reflectKey = this.lookupFields[key];
            prop = forms[key];
            if(prop == false){continue;}
            if(prop.compType !="compLookup" ||vm.fieldName == prop.fieldName){
                if(vm.fieldName == prop.fieldName){
                    tablelist[i] = {[key]:lookup_value[i][reflectKey+"_value"]};
                }
            }else{
                
            }
         
        }
        tablelist[i] = {[this.fieldName]:lookup_value[i][this.lookuporgval]};
    }
    setTimeout(function(){
        $.sendLookup({tablelist:tablelist,});
        plus.webview.currentWebview().close("none");
    },10);
},
loolupToLookup:function(forms,fieldName,org){
// var getLookupValue = function(field,org){
//     var data = {
//         lookupchoice:prop.lookupchoice,
//         org:org,
//         conditions:prop.condition,
//         lookuporgval:prop.lookuporgval
//     }
//     var url = SYS_APP+"/Common/app_lookupGeneralsTwo/lookupchoice/"+prop.lookupchoice;
//     return Pr$.ajax({url:url,data:data,type:'post',success:function(e){
//         return e;
//     }})
// }
// var getValueByLookup = function(forms,lookupFields,lookup_fieldName,lookup_value){
//     var obj = {};
//     var reflectKey = "";
//     var field = {};
//     obj[lookup_fieldName] = lookup_value[field.lookuporgval];
//     for(var key in lookupFields) {
//         field = forms[key];
//         if(field == false){continue;}
//         reflectKey = lookupFields[key];
//         if(field.compType !="compLookup" && field.fieldName !== lookup_fieldName){
//             obj[key]=lookup_value[reflectKey+"_value"];
//         }else{

//         } 
//     }
//     return obj;
// }

},
