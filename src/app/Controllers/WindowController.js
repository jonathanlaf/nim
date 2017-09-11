nodeInstanceManagerApp.controller('WindowController', function WindowController($scope) {

	$scope.remote = require('electron').remote;
    $scope.window = $scope.remote.getCurrentWindow();

    $scope.resizeContent = () => {
        //let windowSize = window.getSize();
        let bodyElem = document.getElementsByTagName('body');
        let width = Number(bodyElem[0].offsetWidth);
        let height = Number(bodyElem[0].offsetHeight);
        let headerElem = document.getElementById('header');
        let headerHeight = Number(headerElem.offsetHeight);
        let footerElem = document.getElementById('title-bar');
        let footerHeight = Number(footerElem.offsetHeight);
        let contentElem = document.getElementById('content');
        let contentHeight = height - headerHeight - footerHeight - 40;

        contentElem.style.width = width;
        contentElem.style.height = contentHeight + 'px';
    };

    $scope.minimize = () => {
    	$scope.window.minimize();
	};

	$scope.maximize = () => {
    	if (!$scope.window.isMaximized()) {
            $scope.window.maximize();
        } else {
            $scope.window.unmaximize();
        }
	};

	$scope.close = () => {
    	$scope.window.close();
	};

	$scope.init = () => {
        $scope.window.on("resize", (e) => {
            $scope.resizeContent();
        });

        $scope.resizeContent();
    };


    document.onreadystatechange = () => {
        if (document.readyState === "complete") {
            $scope.init();
        }
    };


});