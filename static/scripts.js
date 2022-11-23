const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

$(document).ready(() => {
  $(function() {
      var $stocks = $('#values');
      $.ajax({
          type: 'GET',
          url: '/stocks/FB',
          success: function(stock) {
              $.each(stock, function(index, stock) {
                  $stocks.append('<p> value: '+ stock.value + ' time stamp: ' + stock.timestamp+ '</p>')
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
