


const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()

app.use(express.static(path.join(__dirname, 'static')))

//sets a route 




app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks()
    console.log(stockSymbols)
    //if statement here for fixing backend
    //return res.status(500).send("error in getting stock")
    res.send({ stockSymbols })
  } catch (error) {
    next(error)
    
  }

})

app.get('/stocks/:symbol', async (req, res,next) => {
  try {
    const { params: { symbol } } = req
    const data = await stocks.getStockPoints(symbol, new Date())
    const d = JSON.stringify(data,null,2)
    //10 values 0-9 indexes 
    //req.value = data[0]
    //console.log(req.value)
  
    let obj = JSON.parse(d)
    console.log(symbol)
    console.log(data)
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
    res.send(data)
    
  } catch (error) {
    next(error)
  }

  
})

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

app.use(function (err,req,res, next){
  console.error(err.stack)
  res.status(500).send('unable to get stock')
})

//Expressjs is a view engine
//res = response, req = requests
//ptentionaly fixed error message???
app.get("/", (req,res,next) => {
  
/*   console.log("unable to get stock request")
  res.send("unable to request stocks") */
  setTimeout(() => {
    try {
      console.log("an error occured fetching stocks")
      
      throw new Error("unable to retrieve stock")
    } catch (error) {
      next(error)
    }
  }, 1000);

  
  
  //res.render("index")
})

app.listen(3000, () => console.log('Server is running!'))


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

