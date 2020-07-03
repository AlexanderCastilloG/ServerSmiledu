"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", usuariosController_1.gamesController.list);
        this.router.get("/:id", usuariosController_1.gamesController.getOne);
        this.router.post("/", usuariosController_1.gamesController.create);
        this.router.put("/:id", usuariosController_1.gamesController.update);
        this.router.delete("/:id", usuariosController_1.gamesController.delete);
    }
}
const gamesRoutes = new GamesRoutes;
exports.default = gamesRoutes.router;
