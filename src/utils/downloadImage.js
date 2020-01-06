import {Platform, PermissionsAndroid} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import {WToast} from 'react-native-smart-tip';
// import {
//   check,
//   request,
//   PERMISSIONS,
//   RESULTS,
//   openSettings,
// } from 'react-native-permissions';

export const DownloadImage = async uri => {
  if (!uri) return null;

  let toastOpts = {
    data: '',
    textColor: '#ffffff',
    backgroundColor: '#444444',
    duration: WToast.duration.SHORT, //1.SHORT 2.LONG
    position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
  };

  const permissions = [
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  ];

  let isGoto = false;
  const os = Platform.OS; // android or ios
  if (os === 'android') {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    console.log(granted);
    if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
      isGoto = true;
    } else {
      isGoto = false;
    }
    if (granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
      isGoto = true;
    } else {
      isGoto = false;
    }
  } else {
    console.log('你已获取了读写权限');
    // 继续运行其它代码
    isGoto = true;
  }

  // let isGoto = false;

  // console.log(PermissionsAndroid);

  // let result = await PermissionsAndroid.check(
  //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  // );
  // console.log(result);
  // if (result) {
  //   isGoto = true;
  // } else {
  //   let granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     // console.log('现在你获得摄像头权限了');
  //     isGoto = true;
  //   } else {
  //     isGoto = false;
  //     // console.log('用户并不屌你');
  //   }
  // }
  // switch (result) {
  //   case 'never_ask_again':
  //     toastOpts.data = '您永久拒绝了，存储权限';
  //     WToast.show(toastOpts);
  //     return;
  //   case 'granted':
  //     toastOpts.data = '您永久拒绝了，存储权限';
  //     WToast.show(toastOpts);
  //     isGoto = true;
  //     break;
  //   case ''
  // }
  // console.log(result);
  // console.log(RESULTS);
  // switch (result) {
  //   case RESULTS.UNAVAILABLE:
  //     //不支持该功能
  //     console.log(1);
  //     toastOpts.data = '您的设备不支持该功能';
  //     WToast.show(toastOpts);
  //     return;
  //   case RESULTS.DENIED:
  //     //该权限尚未被请求、被拒绝，但可请求
  //     let req = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  //     if (req == RESULTS.DENIED) {
  //       toastOpts.data = '您已经拒绝授权';
  //       WToast.show(toastOpts);
  //       isGoto = false;
  //       return;
  //     } else {
  //       toastOpts.data = '您已经同意授权';
  //       WToast.show(toastOpts);
  //       isGoto = true;
  //     }
  //     console.log(2);
  //     break;
  //   case RESULTS.GRANTED:
  //     //授予权限
  //     console.log(3);
  //     isGoto = true;
  //     break;
  //   case RESULTS.BLOCKED:
  //     //该权限被拒绝
  //     toastOpts.data = '您已经禁用APP读写手机储存权限,访问受限';
  //     WToast.show(toastOpts);
  //     // Alert.alert('提示', '您已经禁用APP读写手机储存权限,访问受限', [
  //     //   {
  //     //     text: '关闭',
  //     //     onDismiss: () => { }
  //     //   },
  //     //   {
  //     //     text: '去设置开启权限',
  //     //     onPress: () => {
  //     //       openSettings()
  //     //     }
  //     //   }
  //     // ]);
  //     console.log(4);
  //     return;
  // }

  if (!isGoto) {
    return null;
  }

  return new Promise((resolve, reject) => {
    let timestamp = new Date().getTime(); //获取当前时间错
    let random = String((Math.random() * 1000000) | 0); //六位随机数
    let dirs =
      Platform.OS === 'ios'
        ? RNFS.LibraryDirectoryPath
        : RNFS.DocumentDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp + random}.jpg`;
    const formUrl = uri;
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      // background: true,
      begin: res => {
        // console.log('begin', res);
        // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
      },
    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise
        .then(res => {
          console.log('success', res);
          // console.log('file://' + downloadDest);
          var promise = CameraRoll.saveToCameraRoll('file://' + downloadDest);

          promise
            .then(function(result) {
              toastOpts.data = '图片保存成功';
              WToast.show(toastOpts);
              // alert('保存成功！地址如下：\n' + result);
            })
            .catch(function(error) {
              toastOpts.data =
                '图片保存失败,需要调用您的存储权限，可去设置-应用-权限中赋予';
              // 'code:' +
              // res.statusCode +
              // ',error:' +
              // error +
              // '，路径：' +
              // downloadDest;
              WToast.show(toastOpts);
              // console.log('error', error);
              // alert('保存失败！\n' + error);
            });
          resolve(res);
        })
        .catch(err => {
          reject(new Error(err));
        });
    } catch (e) {
      reject(new Error(e));
    }
  });
};
