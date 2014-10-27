control.controller('reportitem1PageController', [ '$scope', '$state', function($scope) {
    $scope.report_navTitle = 'Report Item';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
}]);
control.controller('reportitem2PageController', [ '$scope', '$state',  function($scope, $state, $cordovaCamera) {
    $scope.report_navTitle = 'Report Item';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();

        }
    }];
    $scope.rightButtons = [{
        type: 'button-icon icon ion-ios7-upload-outline',
        tap: function(e) {
            $state.go('entry');
        }
    }];
    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURL = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

}]);