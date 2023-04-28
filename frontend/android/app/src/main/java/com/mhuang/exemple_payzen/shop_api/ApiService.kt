package com.mhuang.exemple_payzen.shop_api

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("/rest/payment")
    suspend fun createPayment(@Body order: Order): Response<FormTokenResponse>
}