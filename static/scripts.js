const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

$(document).ready(() => {
  $(function(){
    var $stocks = $('#values');
    $.ajax({
      type: 'GET',
      url: '/stocks',
      success: function(stock_main){
        $.each(stock_main,function(index,stock_main){
          let lenght_of_arr = stock_main.length;
          //$stocks.append'<p> value: '+ stock.value + ' time stamp: ' + stock.timestamp+ '</p>'
          for(let i=0; i<lenght_of_arr;i++){
            $(document).ready(() => {
              $(function(){
                $.ajax({
                  type:'GET',
                  url:'/stocks/' + stock_main[i],
                  success: function(stock_info){
                    $.each(stock_info, function(index,stock_info){
                      let id = index+1;
                      $stocks.append('<p> stock id: '+id+ ' name: ' +stock_main[i]+ " value: " + stock_info.value+ " timeStamp: " +stock_info.timestamp+'</p>')
                    })
                  }
                })
              })
            })
          }
        })
        setTimeout(() => {
          $('#spinner').removeAttr('id');
        }, 2000);

      }
      
    })
  })
});

function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])