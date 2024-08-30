<template>
  <div class="container">
    <!-- Loader animation -->
    <div v-if="isAnimating" class="loader-container">
      <div class="loader"></div>
    </div>
    
    

    <!-- Login -->
    <div v-else class="form-wrapper">
      <form class="form" v-if="isLogin" @submit.prevent="handleSubmit">
        <p class="title">Entrar</p>
        <p class="message">Ao entrar você terá acesso a todas as funcionalidades.</p>
        <label>
          <input required="" placeholder="" type="email" class="input" v-model="email">
          <span>Email</span>
        </label>
        
        <label>
          <input required="" placeholder="" type="password" class="input" autocomplete="current-password" v-model="password"
           >
          <span>Senha</span>
        </label>
        <button class="submit"  @click="signIn">Entrar</button>
        <p v-if="errMsg" class="msg">{{ errMsg }}</p>

        <p class="signin">Ainda não possui uma conta? <a href="#" @click.prevent="toggleForm">Registrar</a></p>
      </form>
                            <!-- Register -->
      <form class="form" v-else @submit.prevent="handleSubmit">
        <p class="title">Registro</p>
        <p class="message">Ao se registrar você terá acesso a todas as funcionalidades.</p>
        <label>
          <input required="" placeholder=""  v-model="username" type="text" class="input">
          <span>Usuario</span>
        </label>
        
        <label>
          <p v-if="emailError" class="msg">{{ emailError }}</p>
          <input required="" placeholder="" v-model="emailRegister"  type="email" class="input">
          <span>Email</span>
        </label> 
        
        <label>
          <input required="" placeholder="" v-model="passwordRegister" passwordregister type="password" class="input">
          <span>Senha</span>
        </label>
        <label>
          <p v-if="pixKeyError" class="msg">{{ pixKeyError }}</p>
          <input required="" placeholder=""  v-model="pixKey" type="text" class="input">
          <span>Chave Pix</span>
        </label>
        <button class="submit" @click="register">Registrar</button>

        <p class="signin">Já tem uma conta? <a href="#" @click.prevent="toggleForm">Entrar</a></p>
      </form>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { setDoc, doc, getFirestore, query, where, getDocs, collection   } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const router = useRouter();
// Login
const email = ref('');
const password = ref('');
const errMsg = ref();
const auth = getAuth();
const loggedIn = ref(false);
const isLogin = ref(true); // Controla qual formulário mostrar
// Registe
const username = ref('');
const emailRegister = ref('');
const passwordRegister = ref('');
const pixKey = ref('');
const pixKeyError = ref('');
const firestore = getFirestore();
const emailError = ref('');
// Animação
const isAnimating = ref(false); // Controla a animação do loader
const isFormVisible = ref(true); // Controla a visibilidade do formulário

function toggleForm() {
  isAnimating.value = true; // Mostrar o loader
  isFormVisible.value = false; // Ocultar o formulário

  setTimeout(() => {
    isLogin.value = !isLogin.value; // Alternar o formulário
    isFormVisible.value = true; // Mostrar o formulário
  }, 2000); // Tempo para a animação do loader  

  setTimeout(() => {
    isAnimating.value = false; // Ocultar o loader
  }, 2000); // Tempo para a animação do loader  
}  


// Função para fazer login
const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      loggedIn.value = true;
      errMsg.value = "Conta encontrada"
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Email invalido!"
          break;
        case "auth/user-not-found":
          errMsg.value = "Nenhuma conta encontrada!"
          break;
        case "auth/wrong-password":
          errMsg.value = "Senha errada!"
          break;
        default:
          errMsg.value = "Email ou senha errado(a)!"
          break;
      }
    })
}
 // Função para registrar um novo usuário

// Register function
const register = async () => {
  emailError.value = '';
  pixKeyError.value = '';

  if (!validateEmail(emailRegister.value)) {
    emailError.value = 'E-mail inválido. Verifique o formato e tente novamente.';
    return;
  }

  try {
    // Check if PIX key already exists
    const usersCollection = collection(firestore, 'users');
    const pixQuery = query(usersCollection, where('pixKey', '==', pixKey.value));
    const pixSnapshot = await getDocs(pixQuery);

    if (!pixSnapshot.empty) {
      pixKeyError.value = 'Chave Pix já está em uso. Por favor, escolha outra.';
      return;
    }

    // Check if email already exists
    const emailQuery = query(usersCollection, where('email', '==', emailRegister.value));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      emailError.value = 'E-mail já está em uso. Escolha outro e tente novamente.';
      return;
    }

    // Create new user
    const userCredential = await createUserWithEmailAndPassword(auth, emailRegister.value, passwordRegister.value);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      username: username.value,
      email: emailRegister.value,
      pixKey: pixKey.value,
      balance: 0,
      transactions: []
    });

    console.log('Registro bem-sucedido!');
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        emailError.value = "Email já está em uso!";
        break;
      case "auth/invalid-email":
        emailError.value = "Email inválido!";
        break;
      case "auth/weak-password":
        errMsg.value = "Senha muito fraca!";
        break;
      default:
        errMsg.value = "Erro ao registrar o usuário!";
        break;
    }
  }
};

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

function alertAdm() {
  alert('Por enquanto somente Administradores');
}
</script>



<style scoped>
.container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;  

}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  font-size: 28px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title::before,.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message, .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}
.msg{
  color: black;
  font-size: 0.7em;
  font-weight: 600;

}
.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  color: black;
  background: #9491919b;

}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: rgb(0, 0, 0);
  font-size: 0.9em;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.loader {
  width: 50px;
  height: 50px;
  background-color: #949191;
  animation: spin 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes spin {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(0.5) rotate(180deg);
  }
}

.form-wrapper {
  transition: opacity 0.5s ease;
}

.form-wrapper {
  opacity: 1;
  transition: opacity 3s ease;
}

.form-wrapper.fade-out {
  opacity: 0;
}
</style>
