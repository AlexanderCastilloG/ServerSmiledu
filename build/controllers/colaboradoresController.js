"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const Colaboradores_model_1 = require("../models/Colaboradores.model");
class ColaboradoresController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageSize = req.query.pagesize; // n° usu por pages
            let currentPage = req.query.page; // n° paginas
            let salto = 0;
            let limite;
            let total = 0;
            pageSize = Number(pageSize);
            currentPage = Number(currentPage);
            if (pageSize && currentPage) {
                salto = pageSize * (currentPage - 1);
                limite = pageSize;
            }
            else {
                limite = 5;
            }
            const count = yield database_1.default.query("SELECT COUNT(*) AS total FROM Colaboradores");
            // tslint:disable-next-line:max-line-length
            const colaboradores = yield database_1.default.query("SELECT a.id, a.nombres, a.apellidos, a.salario, a.estado, a.correo, a.created_at, b.cargo FROM colaboradores AS a INNER JOIN cargos AS b ON a.cargo_id=b.id ORDER BY a.salario DESC LIMIT ? OFFSET ?", [limite, salto]);
            if (count.length > 0) {
                total = count[0].total;
            }
            res.status(200).json({
                ok: true,
                colaboradores,
                maxColaboradores: total
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            // tslint:disable-next-line:max-line-length
            const Colaboradores = yield database_1.default.query("SELECT b.*, c.cargo FROM colaboradores as b INNER JOIN cargos as c ON b.cargo_id=c.id WHERE b.id = ?", [id]);
            if (Colaboradores.length > 0) {
                return res.status(200).json({
                    ok: true,
                    colaborador: Colaboradores[0]
                });
            }
            res.status(404).json({
                ok: false,
                error: "El Colaborador no existe"
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombres, apellidos, salario, cargo, correo } = req.body;
            const colaborador = new Colaboradores_model_1.Colaborador(nombres, apellidos, salario, cargo, correo);
            yield database_1.default.query("INSERT INTO Colaboradores set ? ", [colaborador]).catch(error => {
                return res.status(400).json({
                    ok: false,
                    error
                });
            });
            res.status(201).json({
                ok: true,
                colaborador
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombres, apellidos, salario, cargo, correo } = req.body;
            const colaborador = new Colaboradores_model_1.Colaborador(nombres, apellidos, salario, cargo, correo);
            yield database_1.default.query("UPDATE Colaboradores SET ? WHERE id = ?", [colaborador, id]);
            res.status(201).json({
                ok: true,
                message: "Colaborador actualizado",
                colaborador
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM Colaboradores WHERE id = ?", [id]);
            res.status(200).json({
                ok: true,
                message: "Colaborador eliminado"
            });
        });
    }
    findEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, id } = req.params;
            let count = [];
            if (id) {
                count = yield database_1.default.query("SELECT COUNT(*) AS contador FROM colaboradores WHERE correo = ? AND id = ?", [email, id]);
                if (count[0].contador === 1) {
                    count[0].contador = 0;
                }
                else {
                    count = yield database_1.default.query("SELECT COUNT(*) AS contador FROM colaboradores WHERE correo = ?", [email]);
                }
            }
            else {
                count = yield database_1.default.query("SELECT COUNT(*) AS contador FROM colaboradores WHERE correo = ?", [email]);
            }
            const contador = count[0].contador;
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
        });
    }
}
exports.colaboradoresController = new ColaboradoresController();
