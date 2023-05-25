import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Private

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user:req.user._id
    });

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
});

// @desc Get order details
// @route GET /api/orders/:id
// @access Private

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", 'name email')
  if(order){
    res.json(order)
  }else{
    res.status(404)
    throw new Error("Order Not Found!!")
  }
});

// @desc   Get logged in user orders
// @route  GET /api/orders/myorders
// @access Private

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user:req.user._id})
  res.json(orders)
});




