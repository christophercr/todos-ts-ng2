/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {fakeRestServerConfig} from "./config/fake-rest-server.run";

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: "app",
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        "../../node_modules/todomvc-common/base.css",
        "../../node_modules/todomvc-app-css/index.css"
    ],
    template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
    angularclassLogo = "assets/img/angularclass-avatar.png";
    name = "Angular 2 Webpack Starter";
    url = "https://twitter.com/AngularClass";

    public constructor() {
        console.log("app - loading...");
    }

    public ngOnInit(): void {
        console.log("app - initialized");

        fakeRestServerConfig();
    }

}
