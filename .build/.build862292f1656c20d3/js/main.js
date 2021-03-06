var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
};

var newFile = function(path)
{
	dir.createFile(path);
};

var newDir = function(path, curr)
{
	//TODO check to see if path already exists
	curr.createDirectory(path);
};
function onsuccess(files)
{
	console.log(files.length);
	for(i = 0; i < files.length; i++)
	{
		console.log(i);
		console.log("File " + i + ": " + files[i].name + "  Path: " + files[i].toURI());
	}
	//TODO do something with the files
}
function onerror(error)
{
	console.log(error.message);
	console.log(error);
	console.log("BAD STUFF");
	//TODO print the error message
}
function onListSuccess(dir)
{
	
	console.log("List Success");
	dir.listFiles(onsuccess, onerror);
	
}
function onListError(error)
{
	console.log("BAD STUFF");
	console.log(error);
}
/**
 * listFiles(dir)
 * This function returns all files in the specified directory
 */
var listFiles = function(dir)
{
	console.log("listFiles");
	try{
	tizen.filesystem.resolve(dir, onListSuccess, onListError, 'r');
	}
	catch(ex)
	{
		console.log(ex);
	}
};

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
    // TODO:: Do your initialization job
    console.log("init() called");
    
    var backEvent = function(e) {
        if ( e.keyName == "menu" ) {
            try {
            	console.log("Button click");
            	newDir('pictures', 'images');
//            	listFiles('images');
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
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};


/**
 * open(filename)
 * This function opens the given file in the appropriate software
 * Return: boolean verifies whether file opened
 */
var open = function(filename)
{};

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