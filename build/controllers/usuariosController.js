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
const usuarios_model_1 = require("../models/usuarios.model");
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageSize = req.query.pagesize; // n° usu por pages
            let currentPage = req.query.page; // n° paginas
            let salto = 0;
            let limite;
            pageSize = Number(pageSize);
            currentPage = Number(currentPage);
            if (pageSize && currentPage) {
                salto = pageSize * (currentPage - 1);
                limite = pageSize;
            }
            // const count: number = await pool.query("SELECT COUNT(*) FROM usuarios");
            const games = yield database_1.default.query("SELECT * FROM usuarios");
            res.json(games);
            //   .then(count => {
            //     res.status(200).json({
            //         message: 'Posts fetched successfully!',
            //         posts: fetchedPosts,
            //         maxPosts: count
            //     });
            // }).catch(error => {
            //     res.status(500).json({
            //         message: "Fetching posts failed!"
            //     });
            // });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuarios = yield database_1.default.query("SELECT * FROM usuarios WHERE id = ?", [id]);
            if (usuarios.length > 0) {
                return res.status(200).json({
                    ok: true,
                    usuario: usuarios[0]
                });
            }
            res.status(404).json({
                ok: false,
                error: "El usuario no existe"
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombres, apellidos, salario, cargo, correo } = req.body;
            const usuario = new usuarios_model_1.Usuario(nombres, apellidos, salario, cargo, correo);
            yield database_1.default.query("INSERT INTO usuarios set ? ", [usuario]).catch(error => {
                return res.status(400).json({
                    ok: false,
                    error
                });
            });
            res.status(201).json({
                ok: true,
                usuario
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombres, apellidos, salario, cargo, correo } = req.body;
            const usuario = new usuarios_model_1.Usuario(nombres, apellidos, salario, cargo, correo);
            yield database_1.default.query("UPDATE usuarios SET ? WHERE id = ?", [usuario, id]);
            res.status(201).json({
                ok: true,
                message: "usuario actualizado",
                usuario
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM usuarios WHERE id = ?", [id]);
            res.status(200).json({
                ok: true,
                message: "Usuario eliminado"
            });
        });
    }
}
exports.usuariosController = new UsuariosController();
