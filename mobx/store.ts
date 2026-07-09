import { makeAutoObservable } from "mobx";

export type UserData = {
  nome: string;
  foto_url: string;
  telefone: string;
  apelido: string;
  criado_em: string;
};

export class UserDataStore {
  userInfoDetails: UserData = {
    nome: "",
    foto_url: "",
    telefone: "",
    apelido: "",
    criado_em: "",
  };
  constructor() {
    makeAutoObservable(this);
  }

  get userInfo() {
    return this.userInfoDetails;
  }
  set userInfo(value: UserData) {
    this.userInfoDetails = value;
  }
}

export const tournamentStore = new UserDataStore();
