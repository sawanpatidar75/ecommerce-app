# 🛍️ E-Shop Frontend

This is the **React.js (Vite)** frontend for the E-Shop platform.

## 🚀 Features

✅ Product catalog with filters  
✅ Product detail page with images and stock-based quantity  
✅ Cart management with Redux  
✅ User profile & orders  
✅ Admin panel (manage products & orders)  
✅ Tailwind CSS for responsive UI  
✅ Redux Toolkit + Redux-Saga for global state & API calls

## 📦 Installation

```bash
cd frontend
npm install
npm run dev
```

Runs on: [http://localhost:5173](http://localhost:5173)

## 🛠️ Important Files

- `src/`
  - `components/`: Reusable UI components
  - `pages/`: Page-level components
  - `slices/`: Redux slices for cart, auth, product, order
  - `sagas/`: Redux-Saga flows for async logic
  - `services/api.js`: Axios instance
  - `app.css` & `index.css`: Global styles

## ⚙️ Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🔥 Deployment

```bash
npm run build
```

Copy `dist/` folder to backend/static/ or serve via nginx.

## 🤝 Contributing

We welcome improvements! Submit PRs or issues.

## 📝 License

MIT