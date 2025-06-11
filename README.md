
# ☀️ Atividade — Dados Espaciais e Irradiação Solar

Projeto fullstack voltado para visualização espacial de dados de **irradiação solar** em diferentes cidades brasileiras. Utiliza dados geoespaciais no formato GeoJSON, apresentados em mapa interativo com painel lateral de consulta.

---

## 📌 Objetivo

Permitir a seleção de uma cidade e exibição, em mapa, da área correspondente, além de dados mensais de **média de irradiação solar global** (Global Horizontal Irradiance — GHI), com visualização intuitiva e interativa.

---

## 🧱 Estrutura do Projeto

```
Atividade/
├── backend/             # Servidor Express + TypeScript com API REST
│   ├── data/            # GeoJSON da cidade e arquivo ZIP com irradiância mensal
│   └── src/             # Rotas, controllers e lógica de banco de dados
├── frontend/front/      # Aplicação React + Leaflet com seleção de cidade e painel informativo
```

---

## ✨ Funcionalidades

- Seleção de cidades com base em dados GeoJSON;
- Exibição de áreas urbanas no mapa via Leaflet;
- Apresentação de irradiância mensal média por cidade;
- Consulta dinâmica de dados a partir de API Express;
- Organização modular com Context API para estado global.

---

## 🔧 Tecnologias Utilizadas

**Frontend**
- React + Vite
- TypeScript
- React Leaflet
- Styled Components

**Backend**
- Node.js + Express
- TypeScript
- PostgreSQL + PostGIS
- Manipulação de arquivos `.geojson` e `.zip`

---

## ▶️ Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/PeedroPrado/DadosEspaciais.git
cd DadosEspaciais/Atividade
```

### 2. Backend

```bash
cd backend
npm install
# Criar arquivo .env com as configurações do banco PostgreSQL
npm run dev
```

### 3. Frontend

```bash
cd ../frontend/front
npm install
npm run dev
```

### 4. Acesse

Abra [http://localhost:5173](http://localhost:5173) no navegador para utilizar o sistema.

---

## 🗃️ Dados Utilizados

- `cidade.geojson`: área urbana da cidade selecionada.
- `global_horizontal_means.zip`: dados mensais de irradiância solar por ponto.

---

## 👨‍🏫 Projeto Acadêmico

Atividade desenvolvida como parte da disciplina de **WEB II**.
