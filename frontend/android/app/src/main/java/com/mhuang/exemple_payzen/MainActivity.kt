package com.mhuang.exemple_payzen

import android.R.attr.country
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ArrayAdapter
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doOnTextChanged
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.LifecycleCoroutineScope
import androidx.lifecycle.lifecycleScope
import com.android.volley.RequestQueue
import com.android.volley.toolbox.Volley
import com.lyra.sdk.Lyra
import com.lyra.sdk.callback.LyraHandler
import com.lyra.sdk.callback.LyraResponse
import com.lyra.sdk.exception.LyraException
import com.mhuang.exemple_payzen.payzen.Payzen
import com.mhuang.exemple_payzen.shop_api.ApiClient
import com.mhuang.exemple_payzen.shop_api.Article
import com.mhuang.exemple_payzen.shop_api.Customer
import com.mhuang.exemple_payzen.shop_api.Order
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.launch
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter


/**
 * Main activity
 * <p>
 * This activity allows to user to perform a payment using the Lyra Mobile SDK
 * <p>
 * In order to perform a quick test payment:
 * <li>You should deploy your merchant server in order to create a payment session</li>.
 * <li>Set the merchant server endpoint in the SERVER_URL constant</li>
 * <li>Build and launch the application</li>
 * <li>Click in Pay button and complete the payment process</li>
 * <p></p>
 * Please note that, for readability purposes in this example, we do not use logs
 *
 * @author Lyra Network
 */
class MainActivity : AppCompatActivity() {

    companion object {

        // TRUE to display a "register the card" switch in the payment form
        private const val ASK_REGISTER_PAY = false

        // Payment parameters
        private const val CURRENCY = "XPF"
        private const val AMOUNT = "100"
        private const val ORDER_ID = ""

        //Customer informations
        private const val CUSTOMER_EMAIL = "customeremail@domain.com"
        private const val CUSTOMER_REFERENCE = "customerReference"
    }

    // Initialize a new RequestQueue instance
    private lateinit var requestQueue: RequestQueue

    // init article
    private val article = Article(
        name = "Burger",
        description = "a tasty burger",
        price = 1000,
        imgResId = R.drawable.burger)
    private var email = "example@mail.com"
    private var reference = "cust1"
    private var apiUrl = "http://192.168.0.110:9447"
    private val formActions = arrayOf("PAYMENT", "ASK_REGISTER_PAY", "REGISTER_PAY", "CUSTOMER_WALLET")

    /**
     * onCreate method
     * Activity creation and SDK initialization
     *
     * @param savedInstanceState
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        // bind article data to view
        articleImage.setImageResource(article.imgResId)
        articleName.text = article.name
        articlePrice.text = "${article.price} XPF"

        editEmail.setText(email)
        editReference.setText(reference)
        editAPIUrl.setText(ApiClient.BASE_URL)

        // listen to email change
        editEmail.doOnTextChanged { text, _, _, _ -> email = text.toString() }
        editAPIUrl.doOnTextChanged { text, _, _, _ -> ApiClient.setAPIUrl(text.toString()) }

        // formAction
        val formActionAdapter: ArrayAdapter<*> = ArrayAdapter<Any?>(this, android.R.layout.simple_spinner_item, formActions)
        formActionAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        formActionSpinner.adapter = formActionAdapter

        try {
            initPayzen(applicationContext)
        } catch (exception: Exception) {
            // handle possible exceptions when initializing SDK (Ex: invalid public key format)
            Log.e("launch", exception.message!!)
        }
        requestQueue = Volley.newRequestQueue(applicationContext)
    }

    fun initPayzen(context: Context) {
        val options = Payzen.getConfig()
        Lyra.initialize(context, BuildConfig.PAYZEN_JS_PUBLIC_KEY, options)
    }

    /**
     * onPayClick method
     * Invokes the payment
     *
     * @param view View of the Pay button
     */
    fun onPayClick(view : View) {
        displayLoadingPanel()
        val selectedView: TextView = formActionSpinner.selectedView as TextView
        val order = Order(
            amount = article.price,
            orderId = generateOrderId(),
            currency = "XPF",
            customer = Customer(email = email, reference = reference),
            formTokenVersion = Lyra.getFormTokenVersion(),
            mode = BuildConfig.ENV_MODE,
            formAction = selectedView.text.toString()
        )
        createPaymentFormToken(order, lifecycleScope, applicationContext, supportFragmentManager)
        hideLoadingPanel()
    }

    private fun generateOrderId(): String {
        val dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss")
        return dateTimeFormatter.format(LocalDateTime.now())
    }

    fun createPaymentFormToken(order: Order, lifecycleScope: LifecycleCoroutineScope, context: Context, supportFragmentManager: FragmentManager) {
        Toast.makeText(
            context,
            "sending to ${ApiClient.BASE_URL}",
            Toast.LENGTH_LONG
        ).show()
        lifecycleScope.launch {
            try {
                val response = ApiClient.apiService.createPayment(order)
                if (response.isSuccessful && response.body() != null && response.body()!!.formToken != null) {
                    showForm(response.body()!!.formToken!!, supportFragmentManager, context)
                } else {
                    Toast.makeText(
                        context,
                        "Error during order placement",
                        Toast.LENGTH_LONG
                    ).show()
                }
            } catch (e: Exception) {
                Toast.makeText(
                    context,
                    "Error creating payment",
                    Toast.LENGTH_LONG
                ).show()
                Log.d("payment", e.message!!)
            }
        }
    }

    fun showForm(formToken: String, supportFragmentManager: FragmentManager, context: Context) {
        Lyra.process(supportFragmentManager, formToken, object : LyraHandler {
            override fun onSuccess(lyraResponse: LyraResponse) {
//            verifyPayment(lyraResponse)
                Log.d("payment", "payment success")
                Toast.makeText(
                    context,
                    "Payment success",
                    Toast.LENGTH_LONG
                ).show()
            }

            override fun onError(lyraException: LyraException, lyraResponse: LyraResponse?) {
                Toast.makeText(
                    context,
                    "Payment fail: ${lyraException.errorMessage}",
                    Toast.LENGTH_LONG
                ).show()
            }
        })
    }

    /**
     * Hide the loading panel
     */
    fun hideLoadingPanel() {
        findViewById<View>(R.id.loadingPanel).visibility = View.GONE
    }

    /**
     * Display the loading panel
     */
    fun displayLoadingPanel() {
        findViewById<View>(R.id.loadingPanel).visibility = View.VISIBLE
    }
}
