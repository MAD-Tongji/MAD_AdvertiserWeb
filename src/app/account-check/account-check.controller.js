(function() {
  'use strict';
  angular
    .module('mad')
    .controller('AccountCheckCtrl', AccountCheckCtrl);

    /** @ngInject */
  function AccountCheckCtrl($scope, Upload, AdvertiserSrv) {
    
    
    // var uploader = Qiniu.uploader({
    //     runtimes: 'html5',      // 上传模式,依次退化
    //     browse_button: 'uploadBtn',         // 上传选择的点选按钮，**必需**
    //     // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
    //     // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
    //     // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
    //     uptoken : '<Your upload token>', // uptoken 是上传凭证，由其他程序生成
    //     uptoken_url: '/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
    //     // uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
    //     //    // do something
    //     //    return uptoken;
    //     // },
    //     get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
    //     // downtoken_url: '/downtoken',
    //     // Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
    //     // unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
    //     // save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
    //     domain: '<Your bucket domain>',     // bucket 域名，下载资源时用到，**必需**
    //     max_file_size: '1mb',             // 最大文件体积限制
    //     max_retries: 3,                     // 上传失败最大重试次数
    //     auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
    //     //x_vars : {
    //     //    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
    //     //    'time' : function(up,file) {
    //     //        var time = (new Date()).getTime();
    //               // do something with 'time'
    //     //        return time;
    //     //    },
    //     //    'size' : function(up,file) {
    //     //        var size = file.size;
    //               // do something with 'size'
    //     //        return size;
    //     //    }
    //     //},
    //     init: {
    //         'FilesAdded': function(up, files) {
    //             plupload.each(files, function(file) {
    //                 // 文件添加进队列后,处理相关的事情
    //             });
    //         },
    //         'BeforeUpload': function(up, file) {
    //               // 每个文件上传前,处理相关的事情
    //         },
    //         'UploadProgress': function(up, file) {
    //               // 每个文件上传时,处理相关的事情
    //         },
    //         'FileUploaded': function(up, file, info) {
    //               // 每个文件上传成功后,处理相关的事情
    //               // 其中 info 是文件上传成功后，服务端返回的json，形式如
    //               // {
    //               //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
    //               //    "key": "gogopher.jpg"
    //               //  }
    //               // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

    //               // var domain = up.getOption('domain');
    //               // var res = parseJSON(info);
    //               // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
    //         },
    //         'Error': function(up, err, errTip) {
    //               //上传出错时,处理相关的事情
    //         },
    //         'UploadComplete': function() {
    //               //队列文件处理完毕后,处理相关的事情
    //         },
    //         'Key': function(up, file) {
    //             // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
    //             // 该配置必须要在 unique_names: false , save_key: false 时才生效

    //             var key = "";
    //             // do something with key here
    //             return key
    //         }
    //     }
    // });

    
    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'https://web.file.myqcloud.com/files/v1/10035512/mad/test',
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': '[AKIDs7AklOniibC7X0shwTGBhLX5cVpZ5ql1,6oUOZwEh3DouaghoSZEWQcKsdDDRCUId]',
                  'Host': 'web.file.myqcloud.com',
                  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
                },
                data: {
                  op: 'upload',
                  filecontent: file
                }
            });
                              // 'Content-Length': resumeSizeResponseReader(file),
            // web.file.myqcloud.com/files/v1/appid/[bucket_name]/[DirName]/[file_name]

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    }
    
    
    
    
    
    $scope.submit = function () {
      // 输入检查
      if (!$scope.detail || !checkInfoValid($scope.detail)) {
        console.log('输入检查');
        console.log($scope.detail);
        return;
      }
      
      // 格式化数据
      var detail = AdvertiserSrv.formatCheckInfo($scope.detail);
      console.log(detail);
      
      AdvertiserSrv.checkInfo().save({
        "detail": {
            "type": detail.companyType,
            "licenseType": detail.licenseType,
            "companyName": detail.companyName,
            "licenseCode": detail.licenseCode,
            "licenseImageUrl": 'http://img.jdzj.com/UserDocument/2013b/wuxibangyao/Picture/201372694821.jpg',
            "location": detail.companyLocationProvince + ',' + detail.companyLocationDistrict,
            "accomodation": detail.accomodation,
            "businessScope": detail.businessScope,
            "businessPeriod": detail.businessPeriodStr,
            "organizationCode": detail.organizationCode,
            "legalPerson": {
                "name": detail.legalPersonName,
                "location": detail.legalPersonLocation,
                "id": detail.legalPersonId,
                "validDate": detail.legalPersonValidDateStr,
                "iflongterm": detail.legalPersonIdIsLong,
                "iflegalperson": detail.legalPersonIflegalperson
            },
            "contactEmail": detail.contactEmail
        }
      }).$promise.then(
        function (response) {
          if (response.errCode === 0) {
            console.log('提交checkInfo成功');
            console.log(response);
          }
        }, function (error) {
          console.log('提交checkInfo失败');
          console.log(error);
        });
    }
  }
  
  function checkInfoValid(detail) {
    if (detail.accomodation && detail.businessPeriod 
      && detail.businessScope && detail.companyLocationDistrict 
      && detail.companyLocationProvince && detail.companyName 
      && detail.companyType && detail.contactEmail 
      && detail.legalPersonId && detail.legalPersonIflegalperson 
      && detail.legalPersonLocation && detail.legalPersonName 
      && detail.legalPersonValidDate && detail.licenseCode
      && detail.licenseType && detail.organizationCode) {
      return true;
    }
    return false;
  }
})();
