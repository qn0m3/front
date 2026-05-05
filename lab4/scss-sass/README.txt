# Лабораторная работа: SCSS / SASS / Less

## Структура проекта
- **task2/** – цветной список чисел 1..100 (SCSS + HTML).
- **task3/** – макет с серыми блоками на SCSS.
- **task4/** – тот же макет, переписанный на SASS.
- **task5/** – тот же макет, переписанный на Less.

## Запуск компиляции в реальном времени:
- cd task2
  sass --watch style.scss:style.css
- cd task3
  sass --watch style.scss:style.css
- cd task4
  sass --watch style.sass:style.css
- cd task5
  lessc style.less style.css
(команда lessc, скомпилирует файл 1 раз)