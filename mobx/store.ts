import { makeAutoObservable } from "mobx";

export type UserData = {
  id: string;
  nome: string;
  foto_url: string | null;
  telefone?: string | null;
  apelido: string;
  criado_em?: string;
};
export type MessagePopUpType = {
  message: string;
  type: "success" | "error" | "alert";
};

export class UserDataStore {
  //esse e um observavel para o mobox reagir a mudanca de estado
  userInfo: UserData | null = null;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get getUserInfo() {
    return this.userInfo;
  }
  //e uma acao do mobx por que e um valor calculado do mobx
  get displayName() {
    return this.userInfo?.apelido || this.userInfo?.nome || "Visitante";
  }
  // e uma action do mobx por que altera um valor de estado
  setUserInfo(user: UserData) {
    this.userInfo = user;
  }
  clearUserInfo() {
    this.userInfo = null;
  }
}

export const userDataStore = new UserDataStore();

export class MessagePopUp {
  messageStore: MessagePopUpType | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  get hasMessage() {
    return this.messageStore !== null;
  }
  // Action
  setMessageStore(message: MessagePopUpType) {
    this.messageStore = message;
  }

  // Action
  clearMessageStore() {
    this.messageStore = null;
  }
}

export const messagePopUpFront = new MessagePopUp();
