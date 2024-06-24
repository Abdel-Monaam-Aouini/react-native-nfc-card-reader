package com.merchant;

import android.nfc.NfcAdapter;
import android.nfc.NfcManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.content.Intent;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class NfcModule extends ReactContextBaseJavaModule {

    private final NfcAdapter nfcAdapter;
    private final ReactApplicationContext reactContext;


    public NfcModule(ReactApplicationContext reactContext) {
        super(reactContext);
        NfcManager manager = (NfcManager) reactContext.getSystemService(Context.NFC_SERVICE);
        nfcAdapter = manager.getDefaultAdapter();
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "NFCCardReader";
    }

    @ReactMethod
    public void isSupported(Promise promise) {
        try {
            if (!reactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_NFC)) {
                promise.resolve( false);
            }
            promise.resolve( nfcAdapter != null);
            NfcAdapter nfcAdapter = NfcAdapter.getDefaultAdapter(reactContext);
        } catch (Exception ex) {
            Log.e("Exception caught - isSupported : ", String.valueOf(ex));
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void isEnabled(Promise promise) {
        try {
            NfcAdapter nfcAdapter = NfcAdapter.getDefaultAdapter(reactContext);
            if (nfcAdapter != null) {
                promise.resolve(nfcAdapter.isEnabled());
            } else {
                promise.resolve(false);
            }
        } catch (Exception ex) {
            Log.e("Exception caught - isEnabled : ", String.valueOf(ex));
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void gotoSettings(Promise promise) {
        try {
            Intent intent = new Intent(Settings.ACTION_NFC_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
            promise.resolve(intent);
        } catch (Exception ex) {
            Log.e("Exception caught - gotoSettings: ", String.valueOf(ex));
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void readNFC(Promise promise) {
        try {
            MainActivity activity = (MainActivity) getCurrentActivity();
            if (activity != null) {
                activity.setNfcResultCallback(promise::resolve);
            }
        } catch (Exception e) {
            promise.reject("Activity not found", e);
        }
    }
}