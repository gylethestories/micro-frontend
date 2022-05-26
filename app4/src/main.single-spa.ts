import { enableProdMode, NgZone } from "@angular/core";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Router, NavigationStart } from "@angular/router";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from "single-spa-angular";
import { singleSpaPropsSubject } from "./single-spa/single-spa-props";

if (environment.production) {
  enableProdMode();
}

const angularLifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      AppModule
    );
  },
  template: "<app4-root />",
  Router,
  NgZone,
  NavigationStart,
});

export const bootstrap = angularLifecycles.bootstrap;
export const mount = angularLifecycles.mount;
export const unmount = angularLifecycles.unmount;
