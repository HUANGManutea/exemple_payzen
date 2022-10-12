package com.mhuang.exemple_payzen.shop_api

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.mhuang.exemple_payzen.BuildConfig
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class ApiClient {
    companion object {
        var BASE_URL = BuildConfig.API_URL

        private val gson: Gson by lazy {
            GsonBuilder().setLenient().create()
        }

        private val httpClient: OkHttpClient by lazy {
            OkHttpClient.Builder().build()
        }

        private var retrofit: Retrofit =
            Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(httpClient)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build()

        var apiService: ApiService = retrofit.create(ApiService::class.java)

        fun setAPIUrl(apiUrl: String) {
            BASE_URL = apiUrl

            retrofit =
            Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(httpClient)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build()

            apiService = retrofit.create(ApiService::class.java)
        }
    }
}