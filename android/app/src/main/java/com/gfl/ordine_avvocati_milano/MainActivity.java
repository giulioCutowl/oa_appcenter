package com.gfl.ordine_avvocati_milano;

import android.content.pm.ActivityInfo;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */


    @Override
    protected String getMainComponentName() {
        return "rn_ordine_avvocati_milano";
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
}
