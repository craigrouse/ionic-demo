import { Component } from '@angular/core';
import { Collectors, Dispatchers, LogLevel, Tealium, TealiumConfig, TealiumEnvironment, TealiumEvent, TealiumView } from '@awesome-cordova-plugins/tealium';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(platform: Platform) {
    platform.ready().then(() => {
      console.log("hello");
      let tealConfig: TealiumConfig = {
        account: "tealiummobile",
        profile: "demo",
        environment: TealiumEnvironment.dev,
        collectors: [Collectors.AppData, Collectors.Connectivity],
        dispatchers: [Dispatchers.Collect],
        loglevel: LogLevel.dev,
        useRemoteLibrarySettings: false
      };

      Tealium.initialize(tealConfig).then(() => {
        let tealView = new TealiumView("hello", new Map<string, any>([
          ["key1", "value1"],
          ["key2", 2]
        ]));
        Tealium.track(tealView);
        let tealEvent = new TealiumEvent("cart_add", new Map<string, any>([
          ["key1", "value1"],
          ["key2", 2],
          ["key3", true]
        ]));
        Tealium.track(tealEvent);
      });
    }

    );
  }

}
