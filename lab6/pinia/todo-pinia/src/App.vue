<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/add">Добавить задачу</router-link> |
      <router-link to="/about">О нас</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 1rem;
  background: #f0f0f0;
  margin-bottom: 1rem;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #2c3e50;
}
nav a.router-link-active {
  font-weight: bold;
  color: #42b983;
}
</style>