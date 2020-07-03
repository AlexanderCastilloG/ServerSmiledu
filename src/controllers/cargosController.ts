import {Request, Response } from "express";
import pool from "../database";

class CargosController {

    public async list (req: Request, res: Response): Promise<void> {

      const cargos: any = await pool.query("SELECT * from cargos");

      res.status(200).json({
        ok: true,
        cargos,
      });
    }

}

export const cargosController: CargosController = new CargosController();
