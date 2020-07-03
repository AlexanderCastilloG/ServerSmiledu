import {Router} from "express";
import {cargosController} from "../controllers/cargosController";

class CargosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", cargosController.list);
    }
}

const cargosRoutes: CargosRoutes = new CargosRoutes;
export default cargosRoutes.router;