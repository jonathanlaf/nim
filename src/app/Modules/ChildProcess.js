const forever = require('forever-monitor');

let _this = {};

_this.init = (/*group, item,*/ filename, dirname) => {

    let Process = {};

    console.log(dirname+'/'.filename);

    Process.child = new (forever.Monitor)(
        filename,
        {
        'silent': true,
        'max': 10,
        'killTree': true,
        //'cwd': 'D:/Personnal Project/expressTest/',
        'cwd': dirname+'/',
        'logFile': './process.log',
        'outFile': './process_stdout.log',
        'errFile': './process_stderr.log',
        }
    );

    Process.start = () => {
        Process.child.on('error', function (info) {
            console.error(info);
        });

        Process.child.on('watch:start', function (info) {
            console.info('Start script : ' + info.file);
            console.info(info);
        });

        Process.child.on('watch:stop', function (info) {
            console.info('Script stopped : ' + info.file);
            console.info(info);
        });

        Process.child.on('stdout', function (info) {
            console.log('STDOUT : ' + info);
        });

        Process.child.on('stderr', function (info) {
            console.info('STDERR : ' + info);
        });


        Process.child.start();
    };

    Process.stop = () => {
        Process.child.stop();
    };

    Process.start();

    return Process;
}

module.exports = _this;