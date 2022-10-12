package com.mhuang.exemple_payzen.shop_api

data class Order(
    val amount: Int,
    val currency: String,
    val customer: Customer,
    val orderId: String,
    val formTokenVersion: Int,
    val mode: String
)
