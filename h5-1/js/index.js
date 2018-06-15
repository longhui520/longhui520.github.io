$(function(){
    $('#fullpage').fullpage({
        verticalCentered: false,
        navigation:false,
        afterLoad:function(link,index){
            $('.section').eq(index-1).addClass('now')
        },
        onLeave:function(index,nextIndex,direction){
            $('.section').eq(index-1).removeClass('now')
        }
    })
})