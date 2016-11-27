"use strict";

// import SinonStatic = Sinon.SinonStatic;
// import SinonFakeServer = Sinon.SinonFakeServer;

// let sinon: SinonStatic = require("sinon/pkg/sinon");
let fakeRest: any = require("fakerest");

import {fakeServer, SinonFakeServer} from "sinon";

let data: any = require("../../api/data.json");

export function fakeRestServerConfig(): void {
    console.log("api data fetched", data);

    let apiUrl: string = "api";
    let skippedUrls: RegExp[] = [/\.html$/];

    let restServer: any = new fakeRest.Server(apiUrl);

    restServer.init(data);

    // logging is off by default, enable it to see network calls in the console
    restServer.toggleLogging();

    // use sinon.js to monkey-patch XmlHttpRequest
    let sinonServer: SinonFakeServer = fakeServer.create();
    sinonServer.autoRespond = true;
    sinonServer.autoRespondAfter = 150; // delay in milliseconds

    // FIXME: how to add filters using SinonJS 2?
    // sinonServer["xhr"].useFilters = true;

    skippedUrls.forEach((skippedUrl: RegExp) => {

        // sinonServer["xhr"].addFilter((method: string, url: string) => {
        // 	//whenever this returns true the request will NOT be faked
        // 	if (url.search(skippedUrl) >= 0) {
        // 		console.log("FakeRest server skipping request: " + url);
        // 		return true;
        // 	}
        //
        // 	return false;
        // });

    });

    sinonServer.respondWith(restServer.getHandler());
    console.log("FakeRest server started with url " + apiUrl);
}
