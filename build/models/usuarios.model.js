"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(nombres, apellidos, salario, cargo, correo) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.salario = salario;
        this.setEstado(salario);
        this.cargo = cargo;
        this.correo = correo;
    }
    setEstado(salario) {
        if (salario <= 1000) {
            this.estado = "BAJO";
        }
        else if (salario > 1000 && salario <= 1500) {
            this.estado = "MEDIO";
        }
        else if (salario > 1500 && salario <= 1900) {
            this.estado = "ALTO";
        }
        else {
            this.estado = "MUY ALTO";
        }
    }
}
exports.Usuario = Usuario;
