# Vite

## 参考

- [Vite](https://ja.vitejs.dev/)
- [create-vue](https://reffect.co.jp/vue/create-vue)

## 使い方

```bash
mkdir sample
cd sample
npm init vue@latest

Need to install the following packages:
  create-vue@3.4.0
Ok to proceed? (y)

Vue.js - The Progressive JavaScript Framework

✔ Project name: … vue-project
✔ Add TypeScript? … [No] / Yes
✔ Add JSX Support? … [No] / Yes
✔ Add Vue Router for Single Page Application development? … No / [Yes]
✔ Add Pinia for state management? … No / [Yes]
✔ Add Vitest for Unit Testing? … No / [Yes]
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? … No / [Yes]
✔ Add Prettier for code formatting? … No / [Yes]

Scaffolding project in sample/vue-project...
# これで雛形ができる
```

- ファイル
  - .eslintrc.cjs     : ESLint
  - .gitignore        : git
  - .prettierrc.json  : Prettier
  - package.json      : npm
  - vite.config.js    : vite
  - index.html
    - src: Vueのソース
    - public: HTML関係のフォルダ

```
# package.jsonができているので npm でインストール
cd vue-project
npm install
npm run lint
npm run dev
```
