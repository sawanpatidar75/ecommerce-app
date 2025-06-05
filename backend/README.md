# 🛍️ E-Shop Backend

This is the **Node.js / Express.js** backend for the E-Shop platform.

## ⚙️ Features

✅ User authentication with JWT  
✅ Product management (CRUD, images, stock, category)  
✅ Order system  
✅ Role-based access (User & Admin)  
✅ Multer for image uploads  
✅ Sequelize ORM for MySQL database

## 📦 Installation

```bash
cd backend
npm install
npm run dev
```

Runs on: [http://localhost:5000](http://localhost:5000)

## 🔧 Environment Variables

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=eshop
JWT_SECRET=your_jwt_secret
```

## 🛠️ Important Folders

- `src/`
  - `routes/`: Express routes
  - `controllers/`: Logic for each route
  - `models/`: Sequelize models
  - `middlewares/`: Auth middleware
  - `seeders/`: Initial data
  - `utils/jwt.js`: JWT helpers

## 🛠️ API Endpoints

- `/api/auth/register`  
- `/api/auth/login`  
- `/api/products`  
- `/api/orders`  
- `/api/categories`  

Protected routes require:

```
Authorization: Bearer <token>
```

## 🔥 Deployment

- Use **pm2** or **docker** for production
- Reverse proxy with **nginx**

## 📝 License

MIT