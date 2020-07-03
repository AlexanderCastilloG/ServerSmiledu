import {Router} from "express";
import {colaboradoresController} from "../controllers/colaboradoresController";

class UsuariosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", colaboradoresController.list);
        this.router.get("/:id", colaboradoresController.getOne);
        this.router.post("/", colaboradoresController.create);
        this.router.put("/:id", colaboradoresController.update);
        this.router.delete("/:id", colaboradoresController.delete);
        this.router.get("/email/:email/:id", colaboradoresController.findEmail);
    }
}

const colaboradoresRoutes: UsuariosRoutes = new UsuariosRoutes;
export default colaboradoresRoutes.router;