package com.merchant;

import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.IsoDep;
import android.os.Build;
import android.util.Log;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import com.github.devnied.emvnfccard.enums.EmvCardScheme;
import com.github.devnied.emvnfccard.model.Application;
import com.github.devnied.emvnfccard.model.EmvCard;
import com.github.devnied.emvnfccard.parser.EmvTemplate;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

public class MainActivity extends ReactActivity implements NfcAdapter.ReaderCallback {

  private NfcAdapter mNfcAdapter;

  private NfcResultCallback nfcResultCallback;

    public interface NfcResultCallback {
        void onTagDiscovered(String result);
    }


  @Override
  protected String getMainComponentName() {
    return "merchant";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
      mNfcAdapter = NfcAdapter.getDefaultAdapter(this);
  }

  @Override
  protected void onResume() {
      super.onResume();

      if (mNfcAdapter != null) {
          Bundle options = new Bundle();
          // Work around for some broken Nfc firmware implementations that poll the card too fast
          options.putInt(NfcAdapter.EXTRA_READER_PRESENCE_CHECK_DELAY, 250);

          // Enable ReaderMode for all types of card and disable platform sounds
          // the option NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK is NOT set
          // to get the data of the tag after reading
          mNfcAdapter.enableReaderMode(this,
                  this,
                  NfcAdapter.FLAG_READER_NFC_A |
                          NfcAdapter.FLAG_READER_NFC_B |
                          NfcAdapter.FLAG_READER_NFC_F |
                          NfcAdapter.FLAG_READER_NFC_V |
                          NfcAdapter.FLAG_READER_NFC_BARCODE |
                          NfcAdapter.FLAG_READER_NO_PLATFORM_SOUNDS,
                  options);
      }
  }

  @Override
  protected void onPause() {
      super.onPause();
      if (mNfcAdapter != null)
          mNfcAdapter.disableReaderMode(this);
  }

   @Override
    public void onTagDiscovered(Tag tag) {

        IsoDep isoDep = null;

        // Whole process is put into a big try-catch trying to catch the transceiver's IOException
        try {
            isoDep = IsoDep.get(tag);
            Log.d("isoDep", isoDep.toString());
            if (isoDep != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    ((Vibrator) getSystemService(VIBRATOR_SERVICE)).vibrate(VibrationEffect.createOneShot(150, 10));
                }
            }

            isoDep.connect();
            byte[] response;

            PcscProvider provider = new PcscProvider();
            provider.setmTagCom(isoDep);

            EmvTemplate.Config config = EmvTemplate.Config()
                    .setContactLess(true)
                    .setReadAllAids(true)
                    .setReadTransactions(true)
                    .setRemoveDefaultParsers(false)
                    .setReadAt(true);

            EmvTemplate parser = EmvTemplate.Builder()
                    .setProvider(provider)
                    .setConfig(config)
                    .build();

            EmvCard card = parser.readEmvCard();
            String cardNumber = card.getCardNumber();
            Date expireDate = card.getExpireDate();
            LocalDate date = null;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                date = LocalDate.of(1999, 12, 31);
            }
            if (expireDate != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    date = expireDate.toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                }
            }
            EmvCardScheme cardGetType = card.getType();
            StringBuilder idContentString = new StringBuilder("{");
            if (cardGetType != null) {
                String typeName = card.getType().getName();
                String[] typeAids = card.getType().getAid();
                idContentString.append("\n  \"typeName\": \"").append(typeName).append("\",");
                
                for (int i = 0; i < typeAids.length; i++) {
                        idContentString.append("\n  \"aid")
                        .append(i).append("\": \"")
                        .append(typeAids[i]).append("\",");

                  //  idContentString = idContentString + "\n" + "aid " + i + " : " + typeAids[i];
                }
            }
            idContentString.append("\n  \"cardNumber\": \"").append(prettyPrintCardNumber(cardNumber)).append("\",");
            idContentString.append("\n  \"expireDate\": \"").append(date).append("\"");

            // Closing the JSON string
            idContentString.append("\n}");

            String finalIdContentString = idContentString.toString();

            if (nfcResultCallback != null) {
              nfcResultCallback.onTagDiscovered(finalIdContentString);
            }
            try {
                isoDep.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            //Trying to catch any ioexception that may be thrown
            e.printStackTrace();
        } catch (Exception e) {
            //Trying to catch any exception that may be thrown
            e.printStackTrace();
        }
    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {
        super.onPointerCaptureChanged(hasCapture);
    }

    public static String prettyPrintCardNumber(String cardNumber) {
        if (cardNumber == null) return null;
        char delimiter = ' ';
        return cardNumber.replaceAll(".{4}(?!$)", "$0" + delimiter);
    }

    public static String bytesToHex(byte[] bytes) {
        StringBuffer result = new StringBuffer();
        for (byte b : bytes) result.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
        return result.toString();
    }

    public void setNfcResultCallback(NfcResultCallback callback) {
        this.nfcResultCallback = callback;
    }
}
