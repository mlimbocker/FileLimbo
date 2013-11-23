var menuEventListener = null;
var fileList = null;
var workingDir = null;


var unregister = function() {
    if ( menuEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', menuEventListener );
        menuEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
};

var onSetWD = function(dir)
{
	console.log(dir.path);
	workingDir = dir;
	console.log("Working Directory set to " + workingDir.path);
}
var onSetWDErr = function(error)
{
	console.log("Error on working directory resolve");
}
var setWorkingDir = function(path)
{
	try
	{
		tizen.filesystem.resolve(path, onSetWD, onSetWDErr, 'rw');
	}
	catch(ex)
	{
		console.log(ex);
	}	
};
var getWorkingDir = function(path)
{
	return workingDir;
}



var newFile = function(path)
{
	try
	{
		workingDir.createFile(path);
		console.log("New file created");
	}
	catch(ex)
	{
		console.log(ex);
	}
};

var newDir = function(path)
{
	try
	{
		workingDir.createDirectory(path);
		console.log("New Directory Created");
	}
	catch(ex)
	{
		console.log(ex);
	}
};
var genList = function(files)
{
	console.log(files.length);
	for(i = 0; i < files.length; i++)
	{
		console.log("File " + i + ": " + files[i].name + "  Path: " + files[i].toURI());
	}
	fileList = files;
	
}
var genListErr = function(error)
{
	console.log(error);
	console.log("MORE BAD STUFF");
	
}
var onListSuccess = function(dir)
{
	
	console.log("List Success");
	dir.listFiles(genList, genListErr);
	
}
var onListError = function(error)
{
	console.log(error);
	console.log("BAD STUFF");
}
/**
 * listFiles(dir)
 * This function returns all files in the specified directory
 */
var listFiles = function()
{
	console.log("listFiles");
	try{
		tizen.filesystem.resolve(workingDir.path, onListSuccess, onListError, 'rw');
	}
	catch(ex)
	{
		console.log(ex);
	}
};

//Initialize function
var init = function () {
    // register once
    if ( menuEventListener !== null ) {
        return;
    }
    setWorkingDir('images');
    // TODO:: Do your initialization job
    console.log("init() called");
    
    var menuEvent = function(e) {
        if ( e.keyName == "menu" ) {
            try {

            	listFiles();
    			newDir('newDir');	
    			newFile('rando.txt');
            	listFiles();
//                if ( $.mobile.urlHistory.activeIndex <= 0 ) {
//                    // if first page, terminate app
//                    unregister();
//                } else {
//                    // move previous page
//                    $.mobile.urlHistory.activeIndex -= 1;
//                    $.mobile.urlHistory.clearForward();
//                    window.history.back();
//                }
            } catch( ex ) {
            	console.log(ex);
                unregister();
            }
        }
    };
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', menuEvent );
    menuEventListener = menuEvent;
};


/**
 * open(filename)
 * This function opens the given file in the appropriate software
 * Return: boolean verifies whether file opened
 */
var open = function(filename)
{
	//TODO insert code to handle opening of files.
};

/**
 * copy(src, dest)
 * This function copies src to dest
 * Return: Boolean
 */
var copy = function(src, dest)
{};

/**
 * move(src, dest)
 * This function moves src to dest
 */
var move = function(src, dest)
{};

/**
 * remove(filename)
 * This function deletes the specified file
 */
var remove = function(filename)
{};

/**
 * rename(filepath, newName)
 * This function renames the file at filepath to newName
 */
var rename = function(filepath, newName)
{};
/**
 * search(filename)
 * This function searches the working directory and all subdirectories for
 * filenames/directories containing 'key'
 * Return: string array containing file paths
 */
var search = function(key)
{};

var onClick = function()
{
	listFiles('images');
};

function onListError(error)
{
	//TODO print the error message
}

var getWorkingDirectory = function()
{};

var up = function()
{};

var navPush = function(dir)
{};

var navPop = function()
{};








$(document).bind( 'pageinit', init );
$(document).unload( unregister );