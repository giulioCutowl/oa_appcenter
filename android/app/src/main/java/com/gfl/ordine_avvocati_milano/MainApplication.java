package com.gfl.ordine_avvocati_milano;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.cookies.CookieManagerPackage;
import com.reactnativecommunity.progressview.RNCProgressViewPackage;
import com.reactnativecommunity.androidprogressbar.RNCProgressBarPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.wonday.pdf.RCTPdfView;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.swmansion.reanimated.ReanimatedPackage;
import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.kevinresol.react_native_default_preference.RNDefaultPreferencePackage;
import com.microsoft.codepush.react.CodePush;


import java.util.Arrays;
import java.util.List;

import com.gfl.ordine_avvocati_milano.BuildConfig;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CookieManagerPackage(),
            new RNCProgressViewPackage(),
            new RNCProgressBarPackage(),
            new RNGestureHandlerPackage(),
            new RCTPdfView(),
            new RNCWebViewPackage(),
            new RNFetchBlobPackage(),
            new RNFSPackage(),
            new VectorIconsPackage(),
            new RNDeviceInfo(),
            new ReanimatedPackage(),
            new SafeAreaContextPackage(),
            new RNNotificationsPackage(MainApplication.this),
            new RNDefaultPreferencePackage(),
            new CodePush(getResources().getString(R.string.CodePushDeploymentKey), getApplicationContext(), BuildConfig.DEBUG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
