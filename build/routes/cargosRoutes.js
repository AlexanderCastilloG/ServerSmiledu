"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cargosController_1 = require("../controllers/cargosController");
class CargosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", cargosController_1.cargosController.list);
    }
}
const cargosRoutes = new CargosRoutes;
exports.default = cargosRoutes.router;
