const Store = require('electron-store');
const store = new Store();
const {dialog} = require('electron').remote;

// Define the `NodeInstanceManagerController` controller on the `nodeInstanceManagerApp` module
nodeInstanceManagerApp.controller('NodeInstanceManagerController', function NodeInstanceManagerController($scope) {
    
    $scope.runningApp = '';

    $scope.addGroup = () => {
        let item = {
            groupName: '',
            editMode: true,
            items: []
        };
        $scope.processesList.push(item);
        store.set('processesList', JSON.parse(angular.toJson($scope.processesList)));
    };

    $scope.addItem = (group) => {
        let groupItem = {
            itemName: '',
            path: '',
            args: '',
            editMode: true
        };
        group.items.push(groupItem);
        store.set('processesList', JSON.parse(angular.toJson($scope.processesList)));
    };

    $scope.editGroup = (group) => {
        group.editMode=true;
    };

    $scope.editItem = (item) => {
        item.editMode=true;
    };

    $scope.deleteGroup = (group) => {
        for(let i=0; i < $scope.processesList.length; i++) {
            if($scope.processesList[i] === group)
            {
                $scope.processesList.splice(i,1);
            }
        }
        $scope.saveProcessesList();
    };

    $scope.deleteItem = (group, item) => {
        for(let i=0; i < group.items.length; i++) {
            if(group.items[i] === item)
            {
                group.items.splice(i,1);
            }
        }
        $scope.saveProcessesList();
    };

    $scope.saveGroup = (group) => {
        group.editMode=false;
        $scope.saveProcessesList();
    };

    $scope.saveItem = (item) => {
        item.editMode=false;
        $scope.saveProcessesList();
    };

    $scope.startItem = (item) => {
        console.log('Start item : ' + item.itemName);
        console.log('node '+item.path);
    };

    $scope.saveProcessesList = () => {
        store.set('processesList', JSON.parse(angular.toJson($scope.processesList)));
    };

    $scope.openFileSelector = (group, item) => {
       dialog.showOpenDialog(
           {
               title:"Please choose a Node script",
               buttonLabel:"Let's rock that!",
               filters: [
                   {
                       name: 'NodeJS', extensions: ['js']
                   }
               ],
               properties: ['openFile']
           },
           (fileNames) => {
               for (let i = 0; i < group.items.length; i++) {
                   if (group.items[i] === item) {
                       $scope.$apply(function() { item.path = fileNames[0]; });
                       $scope.saveProcessesList();
                       return;
                   }
               }
            }
       );
    };

    $scope.init = () => {
        $scope.runningApp = "No NodeJS Instance running";

        if (store.get('processesList')) {
            $scope.processesList = store.get('processesList');
        }
        else {
            store.set('processesList', [
                {
                    groupName: '',
                    editMode: true,
                    items: []
                }
            ]);
            $scope.processesList = store.get('processesList');
        }
    };

    $scope.init();
});