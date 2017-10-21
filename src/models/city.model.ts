export class City {
  id: string;
  ibge: string;
  nome: string;
  uf: string;
  
  constructor(id: string, ibge: string, nome, uf: string) {
    this.id = id;
    this.ibge = ibge;
    this.nome = nome;
    this.uf = uf;
  }
}