// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

let localStore;

beforeEach(() => {
  localStore = {};

  spyOn(window.localStorage, 'getItem').and.callFake((key) =>
    key in localStore ? localStore[key] : null
  );
  spyOn(window.localStorage, 'setItem').and.callFake(
    (key, value) => (localStore[key] = value + '')
  );
  spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
