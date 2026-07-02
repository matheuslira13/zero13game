class Util {
  static configuralinga = "pt-br";
  static configHora = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  static getFormatDate() {
    let data = new Date();
    return data.toLocaleDateString(this.configuralinga, this.configHora);
  }
}

class Conta {
  constructor(nome, numero, saldo) {
    this.nome = nome;
    this.numero = numero;
    this.saldo = saldo;
    this.extrato = [];
  }

  get exibirExtrato() {
    console.log("============Extrato da conta:------------");
    this.extrato.forEach((item) => console.log(item));
    console.log("============FIM da conta:------------");
  }

  registrarExtrato(item) {
    this.extrato.push(item);
  }
}

class ContaPoupanca extends Conta {
  #tacaDESaque = 0.1;
  saque(valor) {
    let taxadeSaque = valor * this.#tacaDESaque;
    let valorDeSaqueComaTaxa = valor + taxadeSaque;
    if (valorDeSaqueComaTaxa > this.saldo) {
      throw new Error("Saldo insuficiente ");
    }
    this.saldo = this.saldo - valorDeSaqueComaTaxa;
    this.registrarExtrato(
      `${Util.getFormatDate()} - Saque de ${valor} - Saldo atual: ${this.saldo}`
    );
    console.log(
      `Saque de ${valor} realizado com sucesso. Taxa de saque: ${taxadeSaque}. Saldo atual: ${this.saldo}`
    );
  }

  deposito(valor) {
    this.saldo = this.saldo + valor;
    this.registrarExtrato(
      `${Util.getFormatDate()} - Depósito de ${valor} - Saldo atual: ${this.saldo}`
    );
    console.log(
      `Depósito de ${valor} realizado com sucesso. Saldo atual: ${this.saldo}`
    );
  }
}

class ContaCorrente extends Conta {
  #taxaDESaque = 0.05;
  saque(valor) {
    let taxadeSaque = valor * this.#taxaDESaque;
    let valorDeSaqueComaTaxa = valor + taxadeSaque;
    if (valorDeSaqueComaTaxa > this.saldo) {
      throw new Error("Saldo insuficiente ");
    }
    this.saldo = this.saldo - valorDeSaqueComaTaxa;
    this.registrarExtrato(
      `${Util.getFormatDate()} - Saque de ${valor} - Saldo atual: ${this.saldo}`
    );
    console.log(
      `Saque de ${valor} realizado com sucesso. Taxa de saque: ${taxadeSaque}. Saldo atual: ${this.saldo}`
    );
  }

  deposito(valor) {
    this.saldo = this.saldo + valor;
    this.registrarExtrato(
      `${Util.getFormatDate()} - Depósito de ${valor} - Saldo atual: ${this.saldo}`
    );
    console.log(
      `Depósito de ${valor} realizado com sucesso. Saldo atual: ${this.saldo}`
    );
  }
}

let fulado = new ContaCorrente("Fulano", 123, 1000);
fulado.#taxaDESaque = 0.0;
console.log(fulado); // 1000
