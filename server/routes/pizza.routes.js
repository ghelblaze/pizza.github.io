const Orders = require("../controllers/pizza.controller");


module.exports = (app) => {
  app.get("/api/orderslist", Orders.AllOrders);
  app.post("/api/addOrder", Orders.createOrder);
  app.delete("/api/orders/:id", Orders.deleteOrder);
  app.put("/api/updateDeliveryStatus/:id",Orders.updateDeliveryStatus);
  app.get("/api/value/:id", Orders.getNewState)

};
