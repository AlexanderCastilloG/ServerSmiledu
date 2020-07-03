"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colaboradoresController_1 = require("../controllers/colaboradoresController");
class UsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", colaboradoresController_1.colaboradoresController.list);
        this.router.get("/:id", colaboradoresController_1.colaboradoresController.getOne);
        this.router.post("/", colaboradoresController_1.colaboradoresController.create);
        this.router.put("/:id", colaboradoresController_1.colaboradoresController.update);
        this.router.delete("/:id", colaboradoresController_1.colaboradoresController.delete);
        this.router.get("/email/:email/:id", colaboradoresController_1.colaboradoresController.findEmail);
    }
}
const colaboradoresRoutes = new UsuariosRoutes;
exports.default = colaboradoresRoutes.router;
