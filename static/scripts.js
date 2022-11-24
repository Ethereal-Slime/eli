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


/*  I have decided to use jquery as a means to query with the backend to show data on the DOM*/
$(document).ready(() => {
  /* waits for the Jquery/DOM to be ready */
  $(function(){
    var $stocks = $('#values');
    /* stores the id where the data will be implemented in this case values */
    $.ajax({
      type: 'GET',
      url: '/stocks',
      /* we are sending a GET request to the route /stocks to receive data such as 
      the stock names which can then be used to return the values and timestamps of each stock
      */
      success: function(stock_main){
        $.each(stock_main,function(index,stock_main){
          let length_of_arr = stock_main.length;
          if (length_of_arr != 5) {
            alert("unable to retrieve all stocks")
          }
          
          for(let i=0; i<length_of_arr;i++){
            let stock_arr = [];
            $(document).ready(() => {
              $(function(){
                $.ajax({
                  
                  type:'GET',
                  url:'/stocks/' + stock_main[i],
                  /* another GET request for format /stock:symbol */
                  success: function(stock_info){
                    $stocks.append('<p> Name: ' + stock_main[i]+'</p>')
                    $.each(stock_info, function(index,stock_info){
                      /* on success display stock name and add to id of #values */
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
                      /* using a case statement so that we can color code the line on the graph with the resulting stock */
                      
                      
                      $stocks.append('<p> stock_id: '+id+  " value: " + stock_info.value+ " timeStamp:     " 
                      + new Date(stock_info.timestamp)/* converts unix timestamp to GMT */+'</p>')
                      stock_arr.push(550-((stock_info.value/100)*500))
                      /* converts each value of the stock as a percentage and stores it stock_arr  */
                      if (index != 0) {
                        let X_1 = ((index-1)*90)+50
                        let X_2 = (index*90)+50
                        let Y_1 = stock_arr[index-1];
                        let Y_2 = stock_arr[index];
                        drawLine([X_1,Y_1],[X_2,Y_2],Colour)
                        /* the stock array and its previous element are called so that we can use the
                        pythagoras theorem to plot it so x along y which results in the diagonal  */

                      }
                    })
                    
                  }
                  

                })
              })
            })
          }
        })
        /* prevents the spinner from infinitely loading as it removes the spinner id after 2 seconds */
        setTimeout(() => {
          $('#spinner').removeAttr('id');
        }, 2000);

      }
      
    })
  })
});











































//$.(stocks_main[i]).append('<p> stock_id: '+id+  " value: " + stock_info.value+ " timeStamp:     " + new Date(stock_info.timestamp)+'</p>')
//ctx.lineTo([stock_info,50],[90*id,550])
//stock_arr.append(stock_info.value)
//drawLine([50+90*(id-1),550],[(50+90*(id-1)),300+stock_info.value])
//drawLine([50+90*(id-1),550],[(50+90*(id-1)),300+stock_info.value],style[index])
//drawLine([50+90*(id-1),550],[950,stock_info.value])
//drawLine([50+90*(id-1),550],[950,50])
//$stocks.append('<p>' + $.id=stock_main[i]+ " stock_id: " +id+ " value: "+stock_info.value+ " timestamp: "+ stock_info.timestamp + '</p>')