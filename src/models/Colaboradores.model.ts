export class Colaborador {

    private id?: number;
    private nombres: string;
    private apellidos: string;
    private salario: number;
    private estado?: string;
    private cargo_id: number;
    private correo: string;
    private created_at?: any;


    constructor(nombres: string, apellidos: string, salario: number, cargo: number, correo: string) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.salario = salario;
        this.setEstado(salario);
        this.cargo_id = cargo;
        this.correo = correo;
    }

    private setEstado(salario: number): void {

        if(salario <= 1000) {
            this.estado = "Bajo";
        } else if(salario > 1000  && salario <= 1500) {
            this.estado = "Medio";
        } else if(salario > 1500 && salario <= 1900) {
            this.estado = "Alto";
        } else {
            this.estado = "Muy Alto";
        }
    }
}