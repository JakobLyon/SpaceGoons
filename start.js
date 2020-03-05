#!/usr/bin/env node

"use strict";

const [,, ...args] = process.argv;

var _GameEngine = require("./lib/GameEngine");

(0, _GameEngine.GameEngine)();
