<template>
  <div class="registration-form">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="email">Email</label>
        <input
            id="email"
            type="email"
            v-model="email"
            :class="{
            'valid': isEmailTouched && !errors.email,
            'invalid': isEmailTouched && errors.email
          }"
            @blur="validateEmail"
        />
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </div>

      <div class="field">
        <label for="password">Пароль</label>
        <input
            id="password"
            type="password"
            v-model="password"
            :class="{
            'valid': isPasswordTouched && !errors.password,
            'invalid': isPasswordTouched && errors.password
          }"
            @blur="validatePassword"
        />
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
      </div>

      <div class="criteria-list">
        <p>Критерии пароля:</p>
        <ul>
          <li :class="{ met: passwordCriteria.lengthMet, unmet: !passwordCriteria.lengthMet }">
            Длина не менее 8 символов
          </li>
          <li :class="{ met: passwordCriteria.digitsMet, unmet: !passwordCriteria.digitsMet }">
            Цифры
          </li>
          <li :class="{ met: passwordCriteria.lowercaseMet, unmet: !passwordCriteria.lowercaseMet }">
            Буквы нижнего регистра
          </li>
          <li :class="{ met: passwordCriteria.uppercaseMet, unmet: !passwordCriteria.uppercaseMet }">
            Буквы верхнего регистра
          </li>
          <li :class="{ met: passwordCriteria.specialMet, unmet: !passwordCriteria.specialMet }">
            Спецсимволы
          </li>
        </ul>
      </div>

      <div class="field">
        <label>
          <input type="checkbox" v-model="agreed" />
          I agree with license agreement
        </label>
      </div>

      <button type="submit" :disabled="!isFormValid || !agreed">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import * as yup from 'yup';

const email = ref('');
const password = ref('');
const agreed = ref(false);
const isEmailTouched = ref(false);
const isPasswordTouched = ref(false);

const emailSchema = yup.string().email('Введите корректный email').required('Email обязателен');
const passwordSchema = yup.string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(/[a-z]/, 'Пароль должен содержать буквы нижнего регистра')
    .matches(/[A-Z]/, 'Пароль должен содержать буквы верхнего регистра')
    .matches(/[!@#$%^&*]/, 'Пароль должен содержать спецсимволы')
    .required('Пароль обязателен');

const errors = ref({ email: '', password: '' });

const validateEmail = async () => {
  isEmailTouched.value = true;
  try {
    await emailSchema.validate(email.value);
    errors.value.email = '';
  } catch (err) {
    errors.value.email = err.message;
  }
};

const validatePassword = async () => {
  isPasswordTouched.value = true;
  try {
    await passwordSchema.validate(password.value);
    errors.value.password = '';
  } catch (err) {
    errors.value.password = err.message;
  }
};

const passwordCriteria = computed(() => {
  const pwd = password.value;
  return {
    lengthMet: pwd.length >= 8,
    digitsMet: /\d/.test(pwd),
    lowercaseMet: /[a-z]/.test(pwd),
    uppercaseMet: /[A-Z]/.test(pwd),
    specialMet: /[!@#$%^&*]/.test(pwd)
  };
});

const isFormValid = computed(() => {
  return !errors.value.email && !errors.value.password && email.value && password.value;
});

watch(password, () => {
  if (isPasswordTouched.value) validatePassword();
});
watch(email, () => {
  if (isEmailTouched.value) validateEmail();
});

const handleSubmit = () => {
  if (isFormValid.value && agreed.value) {
    alert('Регистрация успешна!');
  }
};
</script>

<style scoped>
.registration-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}
.field {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="email"], input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
}
input.valid {
  border-color: green;
}
input.invalid {
  border-color: red;
}
.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.criteria-list {
  background: #2c3e50;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  border: 1px solid #1a2a3a;
}
.criteria-list p {
  margin: 0 0 8px 0;
  font-weight: bold;
  color: white;
}
.criteria-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.criteria-list li {
  margin: 6px 0;
  font-weight: 500;
}
.met {
  color: #a3e4a3;
}
.unmet {
  color: #ffaaaa;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>