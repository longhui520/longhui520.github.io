$(function(){
    $('#fullpage').fullpage({
        verticalCentered: false,
        navigation:true,
        afterLoad:function(link,index){
            $('.section').eq(index-1).addClass('now')
        },
        onLeave:function(index,nextIndex,direction){
            $('.section').eq(index-1).removeClass('now')
        }
    })
})