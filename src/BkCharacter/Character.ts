import { MessageLayer } from 'modloader64_api/MessageLayer';
import { TunnelMessageHandler } from 'modloader64_api/GUITunnel';

const electron = require('electron');
const ipc = electron.ipcRenderer;
const hooks = {};

class MapMessageHandlers {
	tunnel: MessageLayer;

	constructor() {
		this.tunnel = new MessageLayer('BkCharacter', ipc, ipc);
		this.tunnel.setupMessageProcessor(this);
	}

	@TunnelMessageHandler('BkCharacter:set')
	onSetCharacter(evt: any){
		let e = document.getElementById(evt.form) as HTMLSelectElement;
		e.value = evt.value;
	}
}

const handlers = new MapMessageHandlers();

let bear_bird: HTMLSelectElement = document.getElementById('bearbird') as HTMLSelectElement;
bear_bird.onchange = () => { handlers.tunnel.send('forwardToML', { id: 'BkCharacter:update', form: 0, value: bear_bird.value }); }

let termite: HTMLSelectElement = document.getElementById('termite') as HTMLSelectElement;
termite.onchange = () => { handlers.tunnel.send('forwardToML', { id: 'BkCharacter:update', form: 1, value: termite.value }); }

let crocodile: HTMLSelectElement = document.getElementById('crocodile') as HTMLSelectElement;
crocodile.onchange = () => { handlers.tunnel.send('forwardToML', { id: 'BkCharacter:update', form: 2, value: crocodile.value }); }

let walrus: HTMLSelectElement = document.getElementById('walrus') as HTMLSelectElement;
walrus.onchange = () => { handlers.tunnel.send('forwardToML', { id: 'BkCharacter:update', form: 3, value: walrus.value }); }

let pumpkin: HTMLSelectElement = document.getElementById('pumpkin') as HTMLSelectElement;
pumpkin.onchange = () => { handlers.tunnel.send('forwardToML', { id: 'BkCharacter:update', form: 4, value: pumpkin.value }); }

let bee: HTMLSelectElement = document.getElementById('bee') as HTMLSelectElement;
bee.onchange = () => { handlers.tunnel.send('forwardToML', { id: 'BkCharacter:update', form: 5, value: bee.value }); }

handlers.tunnel.send('forwardToML', { id: 'BkCharacter:request' });

module.exports = hooks;