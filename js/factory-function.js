module.exports = function factoryFunction() {
  var orders = []
  function buying(type) {
    if (type == "small") {
      return {
        pizza: "small",
        prize: 57.55,
      };
    } else if (type == "medium") {
      return {
        pizza: "medium",
        prize: 86.55,
      };
    } else if (type == "large") {
      return {
        pizza: "large",
        prize: 95.55,
      };
    }
  }
  function getData(data) {
    var obj = {
      largePizza: 0,
      mediumPizza: 0,
      smallPizza: 0,
    };
    for (const key in data) {
      if (key == "largePizza") {
        obj.largePizza = (data[key] * 95.55).toFixed(2);
      } else if (key == "mediumPizza") {
        obj.mediumPizza = (data[key] * 86.55).toFixed(2);
      } else if (key == "smallPizza") {
        obj.smallPizza = (data[key] * 57.55).toFixed(2);
      }
    }
    obj["total"] = (
      parseFloat(obj.largePizza) +
      parseFloat(obj.mediumPizza) +
      parseFloat(obj.smallPizza)
    ).toFixed(2);
    return obj;
  }
  function orderNow(ordersTotal, arrg) {
      orders.length = 0;
      var ids = []
      if(arrg){
          arrg.forEach(element =>{
            ids.push(element.orderId)
            orders.push(element);
        });
      } else{}
    if(ordersTotal){
        var id = Math.max(...ids)
        var obj = {
            orderId: id + 1,
            status: "payment pending",
            btnName: "pay",
            amount: ordersTotal
        }
        orders.push(obj)
    } else{}
    } 
    function getOrders(){
        return orders
    }
    function makeChanges(data, id, action){
        orders.length = 0;
        data.forEach(element =>{
            if(element.orderId == id){
                if(action =="pay"){
                    element.status = "Collect";
                    element.btnName = "collect";
                    orders.push(element)
                } else if(action =="collect"){
                    element.status = "Collected";
                    element.btnName = "collected";
                    orders.push(element)
                } else{}
            } else{
                orders.push(element)
            }
        })
    }
  return {
    buying,
    getData,
    orderNow,
    getOrders,
    makeChanges
  };
};
