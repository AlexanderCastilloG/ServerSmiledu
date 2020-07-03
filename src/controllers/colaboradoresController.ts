import {Request, Response } from "express";
import pool from "../database";
import { Colaborador } from "../models/Colaboradores.model";

class ColaboradoresController {

    public async list (req: Request, res: Response): Promise<void> {

      let pageSize: any =  req.query.pagesize; // n° usu por pages
      let currentPage: any = req.query.page; // n° paginas
      let salto: number = 0;
      let limite: number;
      let total: number = 0;

      pageSize = Number(pageSize);
      currentPage = Number(currentPage);

      if(pageSize && currentPage) {
        salto = pageSize * (currentPage - 1);
        limite = pageSize;
      } else {
        limite = 5;
      }

      const count: any[] = await pool.query("SELECT COUNT(*) AS total FROM Colaboradores");
      // tslint:disable-next-line:max-line-length
      const colaboradores: any = await pool.query("SELECT a.id, a.nombres, a.apellidos, a.salario, a.estado, a.correo, a.created_at, b.cargo FROM colaboradores AS a INNER JOIN cargos AS b ON a.cargo_id=b.id ORDER BY a.salario DESC LIMIT ? OFFSET ?",
      [limite, salto]);

      if (count.length > 0 ) {
        total = count[0].total;
      }

      res.status(200).json({
        ok: true,
        colaboradores,
        maxColaboradores: total
      });
    }

    public async getOne (req: Request, res: Response): Promise<any> {

      const { id } = req.params;
      // tslint:disable-next-line:max-line-length
      const Colaboradores:any[] = await pool.query("SELECT b.*, c.cargo FROM colaboradores as b INNER JOIN cargos as c ON b.cargo_id=c.id WHERE b.id = ?", [id]);

      if(Colaboradores.length > 0) {
        return res.status(200).json({
          ok: true,
          colaborador: Colaboradores[0]
        });
      }

      res.status(404).json({
        ok: false,
        error: "El Colaborador no existe"
      });
    }

    public async create (req: Request, res: Response): Promise<void> {

      const {nombres, apellidos, salario, cargo, correo} = req.body;
      const colaborador: Colaborador = new Colaborador(nombres, apellidos, salario, cargo, correo);

      await pool.query("INSERT INTO Colaboradores set ? ", [colaborador]).catch(error => {
        return res.status(400).json({
          ok: false,
          error
        });
      });

      res.status(201).json({
        ok: true,
        colaborador
      });
    }

    public async update (req: Request, res: Response): Promise<void> {

      const {id} = req.params;
      const {nombres, apellidos, salario, cargo, correo} = req.body;

      const colaborador: Colaborador = new Colaborador(nombres, apellidos, salario, cargo, correo);
      await pool.query("UPDATE Colaboradores SET ? WHERE id = ?", [colaborador, id]);

      res.status(201).json({
        ok: true,
        message: "Colaborador actualizado",
        colaborador
      });
    }

    public async delete (req: Request, res: Response): Promise<void> {

      const { id } = req.params;
      await pool.query("DELETE FROM Colaboradores WHERE id = ?", [id]);

      res.status(200).json({
        ok: true,
        message: "Colaborador eliminado"
      });
    }

    public async findEmail (req: Request, res: Response): Promise<any> {

      const {email, id}  = req.params;
      let count: any[] = [];

      if(id) {
        count = await pool.query("SELECT COUNT(*) AS contador FROM colaboradores WHERE correo = ? AND id = ?", [email, id]);
        if (count[0].contador === 1) {
          count[0].contador = 0;
        } else {
          count = await pool.query("SELECT COUNT(*) AS contador FROM colaboradores WHERE correo = ?", [email]);
        }
      } else {
        count = await pool.query("SELECT COUNT(*) AS contador FROM colaboradores WHERE correo = ?", [email]);
      }
      const contador: number = count[0].contador;

      if (contador > 0) {
        return res.status(200).json({
          ok: true,
          message: "Correo encontrado"
        });
      }

      res.status(200).json({
        ok: false,
        message: "Correo no encontrado"
      });
    }

}

export const colaboradoresController: ColaboradoresController = new ColaboradoresController();
