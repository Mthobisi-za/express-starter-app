var factory = require("../js/factory-function");
var useFactory = factory();
module.exports = function makeChanges(){
    function homeRoute(req,res){
        if(req.session.username){
            var data = useFactory.getData(req.session.pizzas)
            res.render("index", {data});
        } else{
            res.render("login");
        }
    }
    function logIn(req,res){
        var name = req.body.name;
        if(name){
            req.session.username = name;
            req.session.pizzas = {
                largePizza: 0,
                mediumPizza: 0,
                smallPizza: 0
            };
            res.redirect("/")
        } else{
            res.render("login", {err: "Please enter name"})
        }
    }
    function buyRoute(req,res){
        var pizza = req.params.type;
        var type = useFactory.buying(pizza);
          if(type.pizza=="small"){
            req.session.pizzas.smallPizza ++
          } else if(type.pizza =="medium"){
            req.session.pizzas.mediumPizza ++
          } else if(type.pizza == "large"){
            req.session.pizzas.largePizza ++
          }
        res.redirect("/")
    }
    function unique(req,res){
        var size = req.params.size;
        var action = req.params.action;
        console.log(size,action);
        if(action == "minus"){
            if(size == "large"){
                if(req.session.pizzas.largePizza >= 1){
                    req.session.pizzas.largePizza --;
                }
            } else if(size == "medium"){
                if(req.session.pizzas.mediumPizza >=1){
                    req.session.pizzas.mediumPizza --;
                }
            } else if(size == "small"){
                if(req.session.pizzas.smallPizza >= 1){
                    req.session.pizzas.smallPizza --;
                }
            }
        } else if(action =="add"){
            if(size == "large"){
                if(req.session.pizzas.largePizza >= 1){
                    req.session.pizzas.largePizza ++;
                }
            } else if(size == "medium"){
                if(req.session.pizzas.mediumPizza >= 1){
                    req.session.pizzas.mediumPizza ++;
                }
            } else if(size == "small"){
                if(req.session.pizzas.smallPizza >= 1){
                    req.session.pizzas.smallPizza ++;
                }
            }
        }
        res.redirect('/')
    }
    function orderRoute(req,res){
        var summPrized = req.body;
        var timesBought = req.session.pizzas
        //useFactory.order(summPrized, timesBought)
        var prizes = summPrized
        var count = timesBought
        res.render("orders", {count, prizes});
    }
    function orderNow(req,res){
        var ordersTotal = req.body.total;
       if(req.session.orders){
            useFactory.orderNow(ordersTotal, req.session.orders);
            var data =useFactory.getOrders();
            req.session.orders = null;
            req.session.orders = data;
       } else{
           var obj = {
               orderId: 1,
               status: "payment pending",
               btnName: "pay",
               amount: ordersTotal
           }
           req.session.orders = [obj];
       }
        var orders = req.session.orders
            req.session.pizzas = null;
            req.session.pizzas = {
                largePizza: 0,
                mediumPizza: 0,
                smallPizza: 0
            };
        res.render("ordernow", {orders})
    }
    function changeOrderStatus(req,res){
        var action = req.params.action;
        var id = req.params.id;
        var data = req.session.orders;
        useFactory.makeChanges(data,id,action);
        //req.session.orders = null;
        //req.session.orders = useFactory.getData;
        var orders = req.session.orders;
       res.render("filteredlist", {orders})
    }
    return{
        homeRoute,
        buyRoute,
        unique,
        logIn,
        orderRoute,
        orderNow,
        changeOrderStatus
    }
}