const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

/* unix time for timestamp */

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
            let stock_arr = [];
            $(document).ready(() => {
              $(function(){
                $.ajax({
                  
                  type:'GET',
                  url:'/stocks/' + stock_main[i],
                  
                  success: function(stock_info){
                    $stocks.append('<p> Name: ' + stock_main[i]+'</p>')
                    $.each(stock_info, function(index,stock_info){
                      
                      let id = index+1;
                      let Colour;
                      //let style  = ["red","yelow","grey","orange","brown"];
                      switch (stock_main[i]) {
                        case "MSFT":
                            Colour = "Brown"
                          break;
                        case "APPL":
                            Colour = "Green"
                          break;
                        case "IBM":
                            Colour = "Purple"
                          break;
                        case "FB":
                            Colour = "Blue"
                          break;
                        case "EA":
                            Colour = "Red"
                          break;
                      }
                      
                      //$.(stocks_main[i]).append('<p> stock_id: '+id+  " value: " + stock_info.value+ " timeStamp:     " + new Date(stock_info.timestamp)+'</p>')
                      $stocks.append('<p> stock_id: '+id+  " value: " + stock_info.value+ " timeStamp:     " + new Date(stock_info.timestamp)+'</p>')
                      stock_arr.push(550-((stock_info.value/100)*500))
                      if (index != 0) {
                        let X_1 = ((index-1)*90)+50
                        let X_2 = (index*90)+50
                        let Y_1 = stock_arr[index-1];
                        let Y_2 = stock_arr[index];
                        drawLine([X_1,Y_1],[X_2,Y_2],Colour)
                      }
                      //ctx.lineTo([stock_info,50],[90*id,550])
                      //stock_arr.append(stock_info.value)
                      //drawLine([50+90*(id-1),550],[(50+90*(id-1)),300+stock_info.value])
                      //drawLine([50+90*(id-1),550],[(50+90*(id-1)),300+stock_info.value],style[index])
                      //drawLine([50+90*(id-1),550],[950,stock_info.value])
                      //drawLine([50+90*(id-1),550],[950,50])
                      //$stocks.append('<p>' + $.id=stock_main[i]+ " stock_id: " +id+ " value: "+stock_info.value+ " timestamp: "+ stock_info.timestamp + '</p>')
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

