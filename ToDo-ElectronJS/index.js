const electron = require('electron');
const {app, BrowserWindow, ipcMain, Menu, ipcRenderer} = electron;

let mainWindow;
let addWindow;

app.on('ready', ()=>{
	mainWindow = new BrowserWindow({
		webPreferences : {
			nodeIntegration: true	
		} 
		});
	mainWindow.loadFile('./main.html')
	mainWindow.on('closed', () =>app.quit());

	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title:'Add New Todo',
		webPreferences : {
			nodeIntegration: true	
		} 
	});
	addWindow.loadFile('./addTodo.html')
	addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) =>{
	mainWindow.webContents.send('todo:add:toMain',todo);
	addWindow.close();
});

const menuTemplate = [
	{
		label: 'File',
		submenu:[
			{ 
				label: 'New Todo',
				click() {
					createAddWindow();
					}
			},

			{
				label: 'Clear Todos',
				click() {
					mainWindow.webContents.send('todo:clear')
				}
			},

			{ 
				label: 'Quit',
				accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q', 
				// accelerator: (() => {
				// 	if (process.platform === 'darwin') {
				// 		return 'Command+Q';
				// 	} else {
				// 		return 'Ctrl+Q'
				// 	}
				// })(),  
				click() {
					app.quit();
				}
			}
		]
	}
]; 
if (process.platform === 'darwin'){
	menuTemplate.unshift({});
	}
if (process.env.NODE_ENV !== 'production') {
	menuTemplate.push({
		label: 'DEV',
		submenu: [
			{ role: 'reload'},
			{
				label: 'Dev Tools',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				},
				accelerator:process.platform ==='darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
			}
		]
	});
}  