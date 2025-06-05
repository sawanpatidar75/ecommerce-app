# 🛍️ E-Shop (MERN Stack with Redux-Saga)

A full-featured e-commerce platform built with:

- **Node.js** + **Express** + **MySQL** (Backend)
- **React.js** + **Vite** + **Tailwind CSS** (Frontend)
- **Redux Toolkit** + **Redux-Saga** for global state and side effects
- **JWT Authentication** with role-based access (user & admin)
- **Image upload** via **Multer** (supports multiple images)
- **Stripe (optional)** or local payment logic

## 🏗️ Features

✅ User authentication & registration  
✅ Browse products with **filters** (category, price, name)  
✅ Product detail page with stock-based quantity management  
✅ Cart system & checkout  
✅ Order history for users  
✅ **Admin panel**:
- Manage products (CRUD, images, stock, category)
- Manage orders (status updates)

## ⚙️ Technologies

| Frontend | Backend | Database |
|----------|---------|----------|
| React.js (Vite) | Node.js, Express | MySQL |
| Redux Toolkit | JWT Auth | Sequelize ORM |
| Redux-Saga | Multer (images) | |
| Tailwind CSS | | |

## 🛠️ Setup

Clone the repo:

```bash
git clone https://github.com/sawanpatidar75/ecommerce-app.git
cd ecommerce-app
```

### 📦 Backend

```bash
cd backend
npm install
npm run dev
```

- `.env` configuration:
  ```
  PORT=5000
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=password
  DB_NAME=eshop
  JWT_SECRET=your_jwt_secret
  ```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🗃️ Database

- Create a **MySQL database** named `eshop`
- Sequelize will auto-create tables on first run (`sequelize.sync()`).

## 🔥 Deployment

✅ Configure `.env` for **production**  
✅ Build frontend:

```bash
cd frontend
npm run build
```

✅ Serve build folder using **nginx** or **Express static**.

## 🤝 Contributing

1. Fork & clone
2. Create a branch: `git checkout -b feature/awesome-feature`
3. Commit changes
4. Push to origin & create a pull request

## 📝 License

MIT

## 🎥 Loom Video Walkthrough
Check out the complete project walkthrough here: [Loom Video](https://www.loom.com/share/498ebd740e0d41748046edfa425caf8e?sid=1934c996-244c-4d3e-b58b-429244d5b3eb)


### 🙌 Thanks for checking out **E-Shop**! Happy coding! 🚀✨