import {Platform} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import {WToast} from 'react-native-smart-tip';

export const DownloadImage = uri => {
  if (!uri) return null;
  return new Promise((resolve, reject) => {
    let timestamp = new Date().getTime(); //获取当前时间错
    let random = String((Math.random() * 1000000) | 0); //六位随机数
    let dirs =
      Platform.OS === 'ios'
        ? RNFS.LibraryDirectoryPath
        : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp + random}.jpg`;
    const formUrl = uri;
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: res => {
        // console.log('begin', res);
        // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
      },
    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise
        .then(res => {
          // console.log('success', res);
          // console.log('file://' + downloadDest)
          var promise = CameraRoll.saveToCameraRoll(downloadDest);

          let toastOpts = {
            data: '',
            textColor: '#ffffff',
            backgroundColor: '#444444',
            duration: WToast.duration.SHORT, //1.SHORT 2.LONG
            position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
          };

          promise
            .then(function(result) {
              toastOpts.data = '图片保存成功,地址' + result;
              WToast.show(toastOpts);
              // alert('保存成功！地址如下：\n' + result);
            })
            .catch(function(error) {
              toastOpts.data =
                '图片保存失败,需要调用您的相册权限，可去设置-应用-权限中赋予';
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
