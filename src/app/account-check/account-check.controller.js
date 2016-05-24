(function() {
  'use strict';
  angular
    .module('mad')
    .controller('AccountCheckCtrl', AccountCheckCtrl);

    /** @ngInject */
  function AccountCheckCtrl($scope, $state, $log, $qupload, $window, AdvertiserSrv, NoticeSrv) {

    // 获取图片上传token
    AdvertiserSrv.getUpToken().get().$promise.then(
      function (response) {
        if (response.errCode === 0) {
          $window.localStorage['upToken'] = response.uptoken;
          // console.log('uptoken:  ' + $window.localStorage['upToken']);
        }
      }).catch(function (error) {
        NoticeSrv.error('未知错误');
      });


    // 上传图片
    $scope.selectFiles = [];
      console.log($window.localStorage['upToken']);
  		var start = function (index) {
  			$scope.selectFiles[index].progress = {
  				p: 0
  			};
  			$scope.selectFiles[index].upload = $qupload.upload({
  				key: $scope.selectFiles[index].file.name.split('.')[0],
  				file: $scope.selectFiles[index].file,
          token: $window.localStorage['upToken']
  			});
  			$scope.selectFiles[index].upload.then(function (response) {
  				$log.info(response);
          $scope.upload = {
            result: '上传成功',
            picUrl: 'http://o7epbv9gm.bkt.clouddn.com/' + response.key,
            isSuccess: true
          }
  			}, function (response) {
  				$log.info(response);
          $scope.upload = {
            result: '上传失败',
            isSuccess: false
          }
  			}, function (evt) {
  				$scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
  			});
  		};

  		$scope.abort = function (index) {
  			$scope.selectFiles[index].upload.abort();
  			$scope.selectFiles.splice(index, 1);
  		};

  		$scope.onFileSelect = function ($files) {
  			var offsetx = $scope.selectFiles.length;
  			for (var i = 0; i < $files.length; i++) {
  				$scope.selectFiles[i + offsetx] = {
  					file: $files[i]
  				};
  				start(i + offsetx);
  			}
  		}


    AdvertiserSrv.getCheckDetail().get().$promise.then(
      function (response) {

        if (response.errCode === 0) {
          if (response.detail) {
            // console.log(response.detail);
            // 有验证信息，把数据填到页面上，disabled掉提交按钮
            var detail = AdvertiserSrv.parseCheckInfo(response.detail);
            // console.log(detail);
            $scope.detail = {
              companyType: detail.type,
              licenseType: detail.licenseType,
              companyName:detail.companyName,
              licenseCode:detail.licenseCode,
              companyLocationProvince: detail.companyLocationProvince,
              companyLocationDistrict: detail.companyLocationDistrict,
              accomodation:detail.accomodation,
              businessScope:detail.businessScope,
              businessPeriod: detail.periodDate,
              periodIsLong: detail.periodIsLong,
              organizationCode: detail.organizationCode,
              legalPersonName: detail.legalPerson.name,
              legalPersonLocation: detail.legalPerson.location,
              legalPersonId: detail.legalPerson.id,
              legalPersonValidDate: detail.legalPerson.idValidDate,
              legalPersonIdIsLong: detail.legalPerson.iflongterm,
              legalPersonIflegalperson: detail.legalPerson.iflegalperson,
              contactEmail: detail.contactEmail,
              licenseImageUrl: detail.licenseImageUrl
            };
            $scope.canSubmit = false;
          } else {
            $scope.canSubmit = true;
          }
        }
      },function (error) {
        console.log(error);
      });


    $scope.submit = function () {
      // 输入检查
      if (!$scope.detail || !checkInfoValid($scope.detail)) {
        // console.log('输入检查');
        // console.log($scope.detail);
        NoticeSrv.notice('请输入合法信息');
        return;
      }

      // 格式化数据
      var detail = AdvertiserSrv.formatCheckInfo($scope.detail);
      // console.log(detail);

      AdvertiserSrv.checkInfo().save({
        "detail": {
            "type": detail.companyType,
            "licenseType": detail.licenseType,
            "companyName": detail.companyName,
            "licenseCode": detail.licenseCode,
            "licenseImageUrl": $scope.upload.picUrl,
            "location": detail.companyLocationProvince + ',' + detail.companyLocationDistrict,
            "accomodation": detail.accomodation,
            "businessScope": detail.businessScope,
            "businessPeriod": detail.businessPeriodStr,
            "periodIsLong": detail.periodIsLong,
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
            // console.log('提交checkInfo成功');
            // console.log(response);
            NoticeSrv.success('提交验证信息成功');
            $state.go('app.account.check', {reload: true});
          }
        }, function (error) {
          // console.log('提交checkInfo失败');
          // console.log(error);
        });
    }
  }

  function checkInfoValid(detail) {
    if (detail.accomodation && detail.businessScope
      && detail.companyLocationDistrict
      && detail.companyLocationProvince && detail.companyName
      && detail.companyType && detail.contactEmail
      && detail.legalPersonId && detail.legalPersonIflegalperson
      && detail.legalPersonLocation && detail.legalPersonName
      && detail.licenseCode
      && detail.licenseType && detail.organizationCode) {
        if ((detail.businessPeriod || detail.periodIsLong) && (detail.legalPersonValidDate || detail.legalPersonIdIsLong)) {

          // 不能日期和长期都填
          if (detail.businessPeriod && detail.periodIsLong) {
            return false;
          }
          if (detail.legalPersonValidDate && detail.legalPersonIdIsLong) {
            return false;
          }
          return true;
        }
    }
    return false;
  }
})();
