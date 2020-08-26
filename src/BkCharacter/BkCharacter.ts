import { IModLoaderAPI, IPlugin, IPluginServerConfig } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { TunnelMessageHandler } from 'modloader64_api/GUITunnel';
import * as API from 'BanjoKazooie/API/Imports';

export interface IConfig {
    bear_bird: string;
    termite: string;
    crocodile: string;
    walrus: string;
    pumpkin: string;
    bee: string;
}

export class BkCharacter implements IPlugin {
    @InjectCore() core!: API.IBKCore;
    ModLoader = {} as IModLoaderAPI;
    name = 'BkCharacter';

    constructor() { }

    preinit(): void { }

    init(): void {
        let config = this.ModLoader.config.registerConfigCategory('BkCharacter') as IConfig;
        this.ModLoader.config.setData('BkCharacter', 'bear_bird', 'BANJO_KAZOOIE'); 
        this.ModLoader.config.setData('BkCharacter', 'termite', 'BANJO_TERMITE');
        this.ModLoader.config.setData('BkCharacter', 'crocodile', 'BANJO_CROCODILE');
        this.ModLoader.config.setData('BkCharacter', 'walrus', 'BANJO_WALRUS');
        this.ModLoader.config.setData('BkCharacter', 'pumpkin', 'BANJO_PUMPKIN');
        this.ModLoader.config.setData('BkCharacter', 'bee', 'BANJO_BEE');
        this.ModLoader.config.save();

        this.core.character.active = true;
        this.core.character.bear_bird_id = (<any>API.CharacterType)[config.bear_bird];
        this.core.character.termite_id = (<any>API.CharacterType)[config.termite];
        this.core.character.crocodile_id = (<any>API.CharacterType)[config.crocodile];
        this.core.character.walrus_id = (<any>API.CharacterType)[config.walrus];
        this.core.character.pumpkin_id = (<any>API.CharacterType)[config.pumpkin];
        this.core.character.bee_id = (<any>API.CharacterType)[config.bee];
    }

    postinit(): void { this.ModLoader.gui.openWindow(330, 190, __dirname + '/Character.html'); }

    onTick(): void { }

    @TunnelMessageHandler('BkCharacter:request')
    onCharacterRequest(evt: any) {
        let config = this.ModLoader.config.registerConfigCategory('BkCharacter') as IConfig;
        this.ModLoader.gui.tunnel.send('BkCharacter:set', { form: 'bearbird', value: config.bear_bird});
        this.ModLoader.gui.tunnel.send('BkCharacter:set', { form: 'termite', value: config.termite});
        this.ModLoader.gui.tunnel.send('BkCharacter:set', { form: 'crocodile', value: config.crocodile});
        this.ModLoader.gui.tunnel.send('BkCharacter:set', { form: 'walrus', value: config.walrus});
        this.ModLoader.gui.tunnel.send('BkCharacter:set', { form: 'pumpkin', value: config.pumpkin});
        this.ModLoader.gui.tunnel.send('BkCharacter:set', { form: 'bee', value: config.bee});
    }

    @TunnelMessageHandler('BkCharacter:update')
    onCharacterUpdate(evt: any) {
        switch (evt.form) {
            case 0:
                this.ModLoader.config.setData('BkCharacter', 'bear_bird', evt.value, true);
                this.core.character.bear_bird_id = (<any>API.CharacterType)[evt.value];
                break;
            case 1:
                this.ModLoader.config.setData('BkCharacter', 'termite', evt.value, true);
                this.core.character.termite_id = (<any>API.CharacterType)[evt.value];
                break;
            case 2:
                this.ModLoader.config.setData('BkCharacter', 'crocodile', evt.value, true);
                this.core.character.crocodile_id = (<any>API.CharacterType)[evt.value];
                break;
            case 3:
                this.ModLoader.config.setData('BkCharacter', 'walrus', evt.value, true);
                this.core.character.walrus_id = (<any>API.CharacterType)[evt.value];
                break;
            case 4:
                this.ModLoader.config.setData('BkCharacter', 'pumpkin', evt.value, true);
                this.core.character.pumpkin_id = (<any>API.CharacterType)[evt.value];
                break;
            case 5:
                this.ModLoader.config.setData('BkCharacter', 'bee', evt.value, true);
                this.core.character.bee_id = (<any>API.CharacterType)[evt.value];
                break;
        }
        
        // Save config
        this.ModLoader.config.save();
    }
}

module.exports = BkCharacter;