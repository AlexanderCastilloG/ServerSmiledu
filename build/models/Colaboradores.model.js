"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Colaborador {
    constructor(nombres, apellidos, salario, cargo, correo) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.salario = salario;
        this.setEstado(salario);
        this.cargo_id = cargo;
        this.correo = correo;
    }
    setEstado(salario) {
        if (salario <= 1000) {
            this.estado = "Bajo";
        }
        else if (salario > 1000 && salario <= 1500) {
            this.estado = "Medio";
        }
        else if (salario > 1500 && salario <= 1900) {
            this.estado = "Alto";
        }
        else {
            this.estado = "Muy Alto";
        }
    }
}
exports.Colaborador = Colaborador;
