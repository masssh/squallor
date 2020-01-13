/* eslint-disable require-jsdoc */
const {app, BrowserWindow, Menu, MenuItem} = require('electron');

app.on('ready', onReady);

function onReady() {
  createMenu();
  createWindow();
}

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#222',
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
    },
  });
  window.loadFile('index.html');
}

function createMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac ? [{
      label: 'Squallor',
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services'},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'},
      ],
    }] : []),
    {
      label: 'File',
      submenu: [
        isMac ? {role: 'close'} : {role: 'quit'},
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        ...(isMac ? [
          {role: 'pasteAndMatchStyle'},
          {role: 'delete'},
          {role: 'selectAll'},
          {type: 'separator'},
          {
            label: 'Speech',
            submenu: [
              {role: 'startspeaking'},
              {role: 'stopspeaking'},
            ],
          },
        ] : [
          {role: 'delete'},
          {type: 'separator'},
          {role: 'selectAll'},
        ]),
      ],
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'},
      ],
    },
    {
      label: 'Window',
      submenu: [
        {role: 'minimize'},
        {role: 'zoom'},
        ...(isMac ? [
          {type: 'separator'},
          {role: 'front'},
          {type: 'separator'},
          {role: 'window'},
        ] : [
          {role: 'close'},
        ]),
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const {shell} = require('electron');
            await shell.openExternal('https://electronjs.org');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
