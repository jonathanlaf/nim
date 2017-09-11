nodeInstanceManagerApp.controller('ChildProcessController', function ChildProcessController($scope) {

	//const ChildProcess = require('../src/app/Modules/ChildProcess.js');
	//const forever = require('forever-monitor');
	const app = require('electron').app;
	const remote = require('electron').remote;
    const window = remote.getCurrentWindow();
    const path = require('path');
    const { spawn } = require('child_process');

    $scope.Messages = ['No messages.'];
	$scope.Processes = [];

	//window.on('window-all-closed', () => {
	    // On OS X it is common for applications and their menu bar
	    // to stay active until the user quits explicitly with Cmd + Q
	    //if (process.platform !== 'darwin') {
	        //for (let i = 0; i < $scope.Processes.length; i++) {
	            //$scope.Processes[i].stop();
	        //}
	    //}
	//});

	/*window.on('before-quit', () => {
	    if (process.platform === 'darwin') {
	        for (let i = 0; i < $scope.Processes.length; i++) { 
	            $scope.Processes[i].stop();
	        }    
	    }
	});*/

	//$scope.Processes.push(ChildProcess.init('index.js', '/Users/jonathanlafleur/Desktop/Sites/NIM/test/expressTest'));

	$scope.createProcess = (group, item) => {
		let file = item.path;
		let filename = path.parse(file).base;
		let dir = path.parse(file).dir;

		//$scope.Processes.push(ChildProcess.init(filename, dir));

		const ChildProcess = spawn('node', [dir+"/"+filename]);

		ChildProcess.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		ChildProcess.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
		});

		ChildProcess.on('close', (code) => {
			if (code !== null) {
				console.log(`child process exited with code ${code}`);	
			}
		});

		//setTimeout(function(){ ChildProcess.kill('SIGKILL') }, 3000);

	}

	//@TODO Include the module directly in ANGULAR.


});