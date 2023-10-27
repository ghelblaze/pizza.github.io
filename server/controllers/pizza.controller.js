const Orders = require("../models/pizza.model");

module.exports.AllOrders = (req, res) => {
  Orders.find()
    .then((orders) => {
      res.json({ orders });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.createOrder = (request, response) => {
  Orders.create(request.body)
    .then((order) => response.json(order))
    .then(console.log({ message: "Pizza order created" }))
    .catch((err) => response.json(err));
};

module.exports.deleteOrder = (request, response) => {
  Orders.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};

/* module.exports.updateDeliveryStatus =  (req, res) => {
  
  Orders.findByIdAndUpdate({ _id: req.params.id }, {  checkDelivery: req.body.checkDelivery  },{new: true})
    .then(console.log({ message: "Pizza order updated" }))
    .then(console.log(req.body))
    .catch((err) => res.json(err));
  
}; */ 
module.exports.updateDeliveryStatus =  async (req, res) => {
  try {
    const doc = await Orders.findById(req.params.id);
    doc.checkDelivery = !doc.checkDelivery;
    await doc.save();
    res.status(200).json({ message: 'Toggle successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.getNewState = async (req, res) => {
  try {
    const doc = await Orders.findById(req.params.id);
    res.status(200).json({ value: doc.checkDelivery });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



