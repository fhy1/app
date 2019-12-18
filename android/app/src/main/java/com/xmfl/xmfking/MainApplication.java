package com.xmfl.xmfking;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.imagepicker.ImagePickerPackage;
import com.theweflex.react.WeChatPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.xmfl.xmfking.invokenative.DplusReactPackage;
import com.xmfl.xmfking.invokenative.RNUMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.umeng.commonsdk.UMConfigure;
// import cn.reactnative.modules.qq.QQPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          new ImagePickerPackage();
          new CameraRollPackage();
          // new DplusReactPackage();
          packages.add(new DplusReactPackage());
          // new QQPackage();
          packages.add(new WeChatPackage());
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
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
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    UMConfigure.setLogEnabled(true);
    RNUMConfigure.init(this, "5df9b20d4ca35705d9000d8a", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "");
  }

  {
    // PlatformConfig.setQQZone("100424468", "c7394704798a158208a74ab60104f0ba");
    // PlatformConfig.setQQZone("101568934","e912c0ffb846b50f3d2b42fc15b04cfc");
    PlatformConfig.setQQZone("1106399454", "n3e1dihw0YZAQSjv");
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
