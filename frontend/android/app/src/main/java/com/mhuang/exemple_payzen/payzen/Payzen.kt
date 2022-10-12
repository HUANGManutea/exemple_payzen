package com.mhuang.exemple_payzen.payzen

import com.lyra.sdk.Lyra
import com.mhuang.exemple_payzen.BuildConfig

class Payzen {
    companion object {
        fun getConfig(): HashMap<String, Any> {
            return hashMapOf(
//                Lyra.OPTION_API_SERVER_NAME to "https://api.secure.osb.pf",
                Lyra.OPTION_API_SERVER_NAME to "https://api.payzen.eu",
                Lyra.OPTION_CARD_SCANNING_ENABLED to BuildConfig.PAYZEN_CARD_SCAN_CAMERA,
                Lyra.OPTION_NFC_ENABLED to BuildConfig.PAYZEN_CARD_SCAN_NFC
            )
        }
    }
}