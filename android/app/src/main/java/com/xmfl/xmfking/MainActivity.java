package com.xmfl.xmfking;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import org.devio.rn.splashscreen.SplashScreen; // 启动页设置添加代码

import com.umeng.socialize.UMShareAPI;
import com.xmfl.xmfking.invokenative.ShareModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // 展示启动页设置代码
    super.onCreate(savedInstanceState);
    ShareModule.initSocialSDK(this);
  }

  @Override
  protected String getMainComponentName() {
    return "app";
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
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
  }
  // @Override
  // public void onActivityResult(int requestCode, int resultCode, Intent data){
  //     super.onActivityResult(requestCode, resultCode, data);
  //     mReactInstanceManager.onActivityResult(requestCode, resultCode, data);
  // }
}
