import {Request, Response } from "express";

class IndexController {

    public index (req: Request, res: Response): void {
      res.json({text: "API Is  /api/colaboradores"});
    }
}

export const indexController: IndexController = new IndexController();