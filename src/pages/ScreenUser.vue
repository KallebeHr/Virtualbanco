<template>
    <div class="container">
        <header>
            <h3>Nome Ficticio</h3>
            <h5>Sair</h5>
        </header>
        <div class="sobre">
            <h5>Heuller Kallebe</h5>
            <h4>Seu Saldo</h4>
            <h1 id="balance">R$0.00</h1>
        </div>
        <div class="inc-exp-container">
            <div>
                <h4>Entrada</h4>
                <p id="money-plus" class="money plus">+$00,00</p>
            </div>
            <div>
                <h4>Saida</h4>
                <p id="money-minus" class="money minus">-$00,00</p>
            </div>
        </div>
        <div class="historico">
            <h3>Historico</h3>
            <ul id="list" class="list">
                <li class="minus">
                    João<span>-R$10,00</span><button class="delete-btn">X
                    </button>
                </li>
                <li class="minus">
                    Kalebe<span>-R$10,00</span><button class="delete-btn">X
                    </button>
                </li>
                <li class="plus">
                    Vitor<span>+R$10,00</span><button class="delete-btn">X
                    </button>
                </li>
                <li class="plus">
                    Luiz<span>+R$10,00</span><button class="delete-btn">X
                    </button>
                </li>
            </ul>
        </div>
        <div class="adicionarTransacao">
            <h3>Adicionar uma nova Transação</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Chave Pix</label>
      <input type="text" id="text" placeholder="Adicione uma Descrição" v-model="text" />
    </div>
    <div class="form-control">
      <label for="amount"
        >Quantidade <br />
        </label
      >
      <input
        type="text"
        id="amount"
        placeholder="Adicione a Quantidade..."
        v-model="amount"
      />
    </div>
    <button class="btn">Adicionar transação</button>
  </form>
        </div>
    </div>


</template>

<script setup>

</script>

<style scoped>
.container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: auto;
    background-color: #f7f7f7;
    color: #000;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20rem;
    margin-top: 1rem;

}

.sobre {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 20rem;
    align-items: flex-start;
    margin-top: 2rem;

}

.sobre h5 {
    margin-bottom: 5px;
    font-size: .8rem;
    font-weight: bold;
    unicode-bidi: isolate;
}

.inc-exp-container {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    height: 7rem;
    width: 20rem;
}

.inc-exp-container>div {
    flex: 1;
    text-align: center;
}

.inc-exp-container>div:first-of-type {
    border-right: 1px solid #dedede;
}

.money {
    font-size: 20px;
    letter-spacing: 1px;
    margin: 5px 0;

}

.money.plus {
    color: #2ecc71;
}

.money.minus {
    color: #c0392b;
}
.list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
  width: 20rem;
}

.list li {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #333;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 0;
}

.list li.plus {
  border-right: 5px solid #2ecc71;
}

.list li.minus {
  border-right: 5px solid #c0392b;
}

.delete-btn {
  cursor: pointer;
  background-color: #e74c3c;
  border: 0;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.list li:hover .delete-btn {
  opacity: 1;
}
h1 {
  letter-spacing: 1px;
  margin: 0;
}

h3 {
  border-bottom: 1px solid #bbb;
  padding-bottom: 10px;
  margin: 40px 0 10px;
}

h4 {
  margin: 0;
  text-transform: uppercase;
}

label {
  display: inline-block;
  margin: 10px 0;
}

input[type='text'],
input[type='number'] {
  border: 1px solid #dedede;
  border-radius: 2px;
  display: block;
  font-size: 16px;
  padding: 10px;
  width: 100%;
}

.btn {
  cursor: pointer;
  background-color: #9c88ff;
  box-shadow: var(--box-shadow);
  color: #fff;
  border: 0;
  display: block;
  font-size: 16px;
  margin: 10px 0 30px;
  padding: 10px;
  width: 100%;
}

.btn:focus,
.delete-btn:focus {
  outline: 0;
}

</style>