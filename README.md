Here is the downloadable `README.md` content in Markdown format, based on the provided project description.

````markdown
# Todo Master 🚀
A beautiful, full-stack **Todo application** built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and deployed on Vercel.



## ✨ Live Demo
| Component | URL |
| :--- | :--- |
| **Frontend** (React App) | https://todo-front-rhp2r59qs-kipkoech-88s-projects.vercel.app/ |
| **Backend API** (Express Server) | https://server-mcg1zk4yn-kipkoech-88s-projects.vercel.app |

---

## 🎯 Features
* **✅ Full CRUD Operations**: Create, read, update, and delete todos.
* **✅ Real-time Updates**: Instant UI updates across all components without manual refresh.
* **✅ Advanced Filtering**: Filter todos by **All**, **Active**, or **Completed**.
* **✅ Smart Search**: Search todos instantly by title.
* **✅ Beautiful Statistics**: Visual cards showing task progress and completion rate.
* **✅ Responsive Design**: Works perfectly on **desktop** and **mobile** devices.
* **✅ Keyboard Shortcuts**: `Enter` to add a new todo, `Escape` to cancel an edit operation.
* **✅ Accessibility**: Includes ARIA labels and full keyboard navigation support.
* **✅ Modern UI**: Features beautiful gradients, smooth animations, and a polished aesthetic.

---

## 🛠️ Tech Stack
The Todo Master application is a **full-stack** project leveraging the following modern technologies:

### Frontend
| Technology | Description |
| :--- | :--- |
| **React 19** | Modern JavaScript library for building user interfaces with the latest features. |
| **Vite** | Next-generation frontend tooling for a fast build tool and development server. |
| **Tailwind CSS** | A utility-first CSS framework for rapid and consistent styling. |
| **Axios** | Promise-based HTTP client for making API calls to the backend. |
| **Custom SVG Icons** | Lightweight, custom-designed icons; no external icon dependencies. |

### Backend
| Technology | Description |
| :--- | :--- |
| **Express.js 5** | Fast, minimalist web application framework for Node.js. |
| **MongoDB with Mongoose** | NoSQL database with an Object Data Modeling (ODM) library for structure and validation. |
| **CORS** | Middleware for enabling Cross-Origin Resource Sharing. |
| **dotenv** | Module to load environment variables from a `.env` file. |

### Deployment
* **Vercel**: Unified platform used for hosting both the frontend and the serverless backend API.
* **MongoDB Atlas**: Cloud-hosted, managed MongoDB service.

---

## 📁 Project Structure
The repository is organized into two main directories: `client` for the React frontend and `server` for the Express.js backend.

```text
final-project/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx    # Handles todo creation
│   │   │   └── TodoList.jsx    # Displays todos, search, and filtering
│   │   ├── config.js         # API base URL configuration
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Root entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
├── server/                     # Express backend
│   ├── config/
│   │   └── database.js       # MongoDB connection logic
│   ├── models/
│   │   └── Todo.js           # Mongoose Todo schema and model
│   ├── routes/
│   │   └── todoroutes.js     # API endpoints/routes for CRUD operations
│   ├── app.js
│   ├── server.js             # Entry point for the Node server
│   ├── package.json
│   └── vercel.json           # Vercel serverless configuration
└── README.md
````

-----

## 🚀 Quick Start

### Prerequisites

  * **Node.js** (version 16 or higher)
  * **MongoDB Atlas** account (or local MongoDB instance)
  * **Vercel** account (for deployment)

### Local Development

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd final-project
    ```

2.  **Setup Backend**

    ```bash
    cd server
    npm install
    ```

    Create a file named **`.env`** in the `server/` directory:

    ```env
    MONGO_URI=your_mongodb_connection_string
    NODE_ENV=development
    PORT=5000
    ```

    Start the backend server:

    ```bash
    npm run dev
    ```

3.  **Setup Frontend**

    ```bash
    cd ../client
    npm install
    ```

    Update the API base URL in **`client/src/config.js`**:

    ```javascript
    export const API_BASE = "http://localhost:5000/api/todos";
    ```

    Start the frontend development server:

    ```bash
    npm run dev
    ```

4.  **Access the application**

      * **Frontend**: `http://localhost:5173`
      * **Backend API**: `http://localhost:5000`

-----

## 🎨 API Endpoints

The backend provides a RESTful API for managing todos.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/todos` | Retrieve all todo items. |
| `POST` | `/api/todos` or `/api/todos/new` | Create a new todo item. |
| `PUT` | `/api/todos/:id` | Update an existing todo item by ID. |
| `DELETE` | `/api/todos/:id` | Delete a todo item by ID. |
| `GET` | `/health` | Server health check endpoint. |
| `GET` | `/api/db-status` | Database connection status check. |

### Example API Usage

You can test the deployed API using `curl` or a tool like Postman:

```bash
# Get all todos
curl [https://server-mcg1zk4yn-kipkoech-88s-projects.vercel.app/api/todos](https://server-mcg1zk4yn-kipkoech-88s-projects.vercel.app/api/todos)

# Create a todo (sends JSON body)
curl -X POST [https://server-mcg1zk4yn-kipkoech-88s-projects.vercel.app/api/todos/new](https://server-mcg1zk4yn-kipkoech-88s-projects.vercel.app/api/todos/new) \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn React Hooks"}'

# Update a todo (e.g., mark as completed)
# Replace 12345 with a valid Todo ID
curl -X PUT [https://server-mcg1zk4yn-kipkoech-88s-projects.vercel.app/api/todos/12345](https://server-mcg1zk4yn-kipkoech-88s-projects.vercel.app/api/todos/12345) \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

-----

## 📦 Deployment

The entire application is set up for easy deployment on **Vercel**.

### Backend Deployment to Vercel

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Deploy using the Vercel CLI:
    ```bash
    npx vercel --prod
    ```
3.  Set **environment variables** in the Vercel dashboard for your deployed backend:
      * `MONGO_URI`: Your MongoDB Atlas connection string.
      * `NODE_ENV`: `production`

### Frontend Deployment to Vercel

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  **Update API Configuration:**
    Edit `client/src/config.js` with your **deployed backend URL**:
    ```javascript
    export const API_BASE = "[https://your-backend.vercel.app/api/todos](https://your-backend.vercel.app/api/todos)"; 
    ```
3.  Deploy using the Vercel CLI:
    ```bash
    npx vercel --prod
    ```

-----

## 🔧 Configuration Files

### Backend Configuration (`server/package.json`)

```json
{
  "name": "server",
  "type": "commonjs",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.20.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3"
  }
}
```

### Backend Vercel Configuration (`server/vercel.json`)

This configuration tells Vercel how to handle the Node.js server.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### Frontend Configuration (`client/package.json`)

```json
{
  "name": "client",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "axios": "^1.13.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.1",
    "tailwindcss": "^3.4.18",
    "vite": "^7.2.4"
  }
}
```

### Frontend Vercel Configuration (`client/vite.config.js`)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
})
```

-----

## 🎯 Key Components

### `TodoForm.jsx`

  * Handles the **creation of new todo** items.
  * Includes form **validation** and submission logic.
  * Manages **loading states** and **error handling**.
  * Implements **keyboard shortcuts** for quick entry.

### `TodoList.jsx`

  * Responsible for **displaying** and **managing** the list of todos.
  * Integrates **search** and **filter** functionality.
  * Contains logic for **edit** and **delete** operations.
  * Generates and displays **real-time statistics** cards.

-----

## 🔒 Environment Variables

### Backend (`server/.env`)

These variables must be set locally and in the Vercel dashboard for production:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
NODE_ENV=production
PORT=5000
```

### Frontend (`client/src/config.js`)

The **API\_BASE** URL must point to your backend's deployed API endpoint in production.

-----

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
| :--- | :--- |
| **CORS Errors** | **1.** Ensure backend has proper CORS configuration (`cors` package). **2.** Check that your frontend URL is allowed in the backend CORS settings. |
| **MongoDB Connection Issues** | **1.** Verify your `MONGO_URI` connection string is correct. **2.** Check **Network Access** in MongoDB Atlas (allow all IPs: `0.0.0.0/0` for initial testing). **3.** Ensure the database user has the correct permissions. |
| **Deployment Issues** | **1.** Check Vercel deployment logs for errors. **2.** Verify that all required environment variables are set correctly in the Vercel dashboard. **3.** Ensure all dependencies are correctly listed in `package.json`. |
| **Build Failures** | **1.** Clear cache and modules (`rm -rf node_modules package-lock.json`). **2.** Reinstall dependencies (`npm install`). **3.** Check Node.js version compatibility. |

### Debug Mode

The application includes comprehensive logging to aid in debugging:

```javascript
// Example: Enable debug logs in the browser console
console.log('API Response:', response.data);
```

-----

## 📱 Browser Support

This application is fully tested and supported on:

  * Chrome 90+
  * Firefox 88+
  * Safari 14+
  * Edge 90+
  * Mobile browsers (iOS Safari, Chrome Mobile)

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

## 📄 License

This project is licensed under the **MIT License** - see the `LICENSE` file for details (if included).

-----

## 👥 Authors

  * **Your Name** - *Initial work*

## 🙏 Acknowledgments

  * **React team** for the amazing framework.
  * **Vercel** for seamless deployment.
  * **MongoDB** for reliable database service.
  * **Tailwind CSS** for beautiful styling.

-----

## 📞 Support

If you have any questions or run into issues:

  * Check the **troubleshooting** section above.
  * **Open an issue** on the GitHub repository.
  * Contact the development team (e.g., via email or social media link).

\<div align="center"\>
⭐ Don't forget to **star** this repository if you found it helpful\!
\</div\>

## 🔗 Useful Links

  * [React Documentation](https://react.dev/)
  * [Express.js Guide](https://expressjs.com/)
  * [MongoDB Atlas](https://www.mongodb.com/atlas)
  * [Vercel Documentation](https://vercel.com/docs)
  * [Tailwind CSS](https://tailwindcss.com/)

Happy coding\! 🎉

```
```