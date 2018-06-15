$(function(){
    $('#fullpage').fullpage({
        verticalCentered: false,
        navigation:false,
        scrollingSpeead:700,
        // afterLoad:function(link,index){
        //     $('.section').eq(index-1).addClass('now')
        // },
        // onLeave:function(index,nextIndex,direction){
        //     $('.section').eq(index-1).removeClass('now')
        // }
        onLeave:function(index,nextIndex,direction){
            $('.section').eq(index-1).addClass('leave')
        },
        ollingSpeead:700,
         afterLoad:function(link,index){
            $('.section').eq(index-2).removeClass('leave')
         }
    })
})