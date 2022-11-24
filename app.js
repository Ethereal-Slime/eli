


const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()

app.use(express.static(path.join(__dirname, 'static')))






app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks()
    console.log(stockSymbols)

    res.send({ stockSymbols })
  } catch (error) {
    next(error)
    console.log("unable to get stock from /stock")
  }

})

app.get('/stocks/:symbol', async (req, res,next) => {
  try {
    const { params: { symbol } } = req
    const data = await stocks.getStockPoints(symbol, new Date())
    
    console.log(symbol)
    console.log(data)
  
  /* using a try_catch function to catch any errors and printing error message to console */

    res.send(data)
    
  } catch (error) {
    
    console.log("unable to get stock from /stock/:symbol")
    next(error)
  }

  
})



app.use(function (err,req,res, next){
  console.error(err.stack)
  res.status(500).send('unable to get stock')
})


app.get("/", (req,res,next) => {
  
/*   console.log("unable to get stock request")
  res.send("unable to request stocks") */
  setTimeout(() => {
    try {
      console.log("an error occured fetching stocks")
      
      throw new Error("unable to retrieve stock")
    } catch (error) {
      console.log("unable to request stock in / route")
      next(error)

    }
  }, 1000);

  /* try to catch error on root directory if so timeout and run the next function
  which executes the succeeding middleware result */
  

})

app.listen(3000, () => console.log('Server is running!'))












































    //console.log(data[Object.keys(data)[0]])
/*     for (const [key,value] of Object.entries(data)){
      console.log(key, value)
    } */
  
    //write a  failsafe here

    //document.body.innerHTML =  d
    //const d = await stocks.getStocks()
    //res.send(data[0]) returns first element of json
    //document.getElementById("values").innerHTML = d.value;
    //data[Object.keys(values)[0] ]
    //timestamps are in accending order
    //res.send(data[Object.keys(data)[0]])



/*         $.ajax({
          type: "POST",
          url: "some.php",
          data: "name=wewww",
          success: function(msg){
                alert( "Data Saved: " + msg );
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert("some error");
          }
        }); */



//Expressjs is a view engine
//res = response, req = requests
//ptentionaly fixed error message???
//res.render("index")
/* $(function(){
  var $stocks = $('#values');
  $.ajax({
    type:'GET',
    url: '/stocks/:symbol',
    success: function(stock){
      $.each(stock, function(i, stock){
        $stocks.append('<p> name: '+ stock.value + ' time stamp: ' + stock.timestamp+ '</p>')
      });
    }
  });
}); */

