const { app, BrowserWindow, globalShortcut } = require('electron');
// Module to control application life.
// Module to create native browser window.
// const electronLocalshortcut = require('electron-localshortcut');

const path = require('path');
const url = require('url');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let quickSearch = null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});
    quickSearch = new BrowserWindow({
      width:784,
      height: 81,
      resizable:false,
      frame:false
    });
    quickSearch.hide();

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');
    quickSearch.loadURL('http://localhost:3000/search');

    //shortcut to open and close window with hot keys
    const shortcut = globalShortcut.register('CommandOrControl+Space', () => {
      mainWindow.show();
    });

    if(!shortcut) { console.log('Register failed.'); }

    const quickShortcut = globalShortcut.register('CommandOrControl+G', () => {
      quickSearch.show();
    });
     if(!quickShortcut) { console.log('Register failed for quickShortcut.'); }
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('close', function (event) {
      // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        event.preventDefault();
        mainWindow.hide();
    });

    quickSearch.on('close', function (event) {
      event.preventDefault();
      quickSearch.hide()
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function (event) {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
        // app.quit()
    // }
    event.preventDefault();
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});
