# 📦 PROYECTO WEB COMPLETO - DOCUMENTACIÓN Y CÓDIGO

## 🌐 Información del Proyecto

**URL del sitio:** https://reverent-mirzakhani-3.preview.emergentagent.com

**Stack Tecnológico:**
- Frontend: React 19 + Tailwind CSS + shadcn/ui
- Backend: FastAPI (Python)
- Base de Datos: MongoDB
- Gestor de paquetes: Yarn

---

## 📁 ESTRUCTURA COMPLETA DEL PROYECTO

```
/app/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   │   └── use-toast.js
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── craco.config.js
│   ├── jsconfig.json
│   └── .env
├── tests/
├── scripts/
└── README.md
```

---

## 🔧 BACKEND (FastAPI + MongoDB)

### 📄 `/app/backend/server.py`

```python
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
```

### 📄 `/app/backend/requirements.txt`

```
fastapi==0.110.1
uvicorn==0.25.0
boto3>=1.34.129
requests-oauthlib>=2.0.0
cryptography>=42.0.8
python-dotenv>=1.0.1
pymongo==4.5.0
pydantic>=2.6.4
email-validator>=2.2.0
pyjwt>=2.10.1
bcrypt==4.1.3
passlib>=1.7.4
tzdata>=2024.2
motor==3.3.1
pytest>=8.0.0
black>=24.1.1
isort>=5.13.2
flake8>=7.0.0
mypy>=1.8.0
python-jose>=3.3.0
requests>=2.31.0
pandas>=2.2.0
numpy>=1.26.0
python-multipart>=0.0.9
jq>=1.6.0
typer>=0.9.0
emergentintegrations==0.1.0
```

### 📄 `/app/backend/.env`

```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
```

---

## 💻 FRONTEND (React + Tailwind)

### 📄 `/app/frontend/src/App.js`

```javascript
import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div>
      <header className="App-header">
        <a
          className="App-link"
          href="https://emergent.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://avatars.githubusercontent.com/in/1201222?s=120&u=2686cf91179bbafbc7a71bfbc43004cf9ae1acea&v=4" />
        </a>
        <p className="mt-5">Building something incredible ~!</p>
      </header>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

### 📄 `/app/frontend/src/index.js`

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 📄 `/app/frontend/src/App.css`

```css
.App-logo {
    height: 40vmin;
    pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
    .App-logo {
        animation: App-logo-spin infinite 20s linear;
    }
}

.App-header {
    background-color: #0f0f10;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
}

.App-link {
    color: #61dafb;
}

@keyframes App-logo-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
```

### 📄 `/app/frontend/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 📄 `/app/frontend/.env`

```env
REACT_APP_BACKEND_URL=https://reverent-mirzakhani-3.preview.emergentagent.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

### 📄 `/app/frontend/package.json`

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@radix-ui/react-accordion": "^1.2.8",
    "@radix-ui/react-alert-dialog": "^1.1.11",
    "@radix-ui/react-aspect-ratio": "^1.1.4",
    "@radix-ui/react-avatar": "^1.1.7",
    "@radix-ui/react-checkbox": "^1.2.3",
    "@radix-ui/react-collapsible": "^1.1.8",
    "@radix-ui/react-context-menu": "^2.2.12",
    "@radix-ui/react-dialog": "^1.1.11",
    "@radix-ui/react-dropdown-menu": "^2.1.12",
    "@radix-ui/react-hover-card": "^1.1.11",
    "@radix-ui/react-label": "^2.1.4",
    "@radix-ui/react-menubar": "^1.1.12",
    "@radix-ui/react-navigation-menu": "^1.2.10",
    "@radix-ui/react-popover": "^1.1.11",
    "@radix-ui/react-progress": "^1.1.4",
    "@radix-ui/react-radio-group": "^1.3.4",
    "@radix-ui/react-scroll-area": "^1.2.6",
    "@radix-ui/react-select": "^2.2.2",
    "@radix-ui/react-separator": "^1.1.4",
    "@radix-ui/react-slider": "^1.3.2",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.2.2",
    "@radix-ui/react-tabs": "^1.1.9",
    "@radix-ui/react-toast": "^1.2.11",
    "@radix-ui/react-toggle": "^1.1.6",
    "@radix-ui/react-toggle-group": "^1.1.7",
    "@radix-ui/react-tooltip": "^1.2.4",
    "axios": "^1.8.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "cra-template": "1.2.0",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.507.0",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-day-picker": "8.10.1",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.2",
    "react-resizable-panels": "^3.0.1",
    "react-router-dom": "^7.5.1",
    "react-scripts": "5.0.1",
    "recharts": "^3.6.0",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.2.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "zod": "^3.24.4"
  },
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@craco/craco": "^7.1.0",
    "@emergentbase/visual-edits": "https://assets.emergent.sh/npm/emergentbase-visual-edits-1.0.8.tgz",
    "@eslint/js": "9.23.0",
    "autoprefixer": "^10.4.20",
    "eslint": "9.23.0",
    "eslint-plugin-import": "2.31.0",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "eslint-plugin-react": "7.37.4",
    "eslint-plugin-react-hooks": "5.2.0",
    "globals": "15.15.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17"
  },
  "packageManager": "yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e"
}
```

### 📄 `/app/frontend/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 📄 `/app/frontend/postcss.config.js`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 📄 `/app/frontend/craco.config.js`

```javascript
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
```

### 📄 `/app/frontend/jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🚀 INSTRUCCIONES DE INSTALACIÓN Y DESPLIEGUE

### Instalación del Backend

```bash
cd /app/backend
pip install -r requirements.txt
```

### Instalación del Frontend

```bash
cd /app/frontend
yarn install
```

### Iniciar Servicios (con Supervisor)

```bash
# Ver estado de servicios
sudo supervisorctl status

# Reiniciar todos los servicios
sudo supervisorctl restart all

# Reiniciar solo backend
sudo supervisorctl restart backend

# Reiniciar solo frontend
sudo supervisorctl restart frontend
```

### Servicios Disponibles

1. **Backend**: Corre en puerto 8001 internamente
2. **Frontend**: Corre en puerto 3000 internamente
3. **MongoDB**: Puerto 27017
4. **Nginx**: Maneja el proxy reverso

---

## 📡 API ENDPOINTS DISPONIBLES

### Base URL
```
https://reverent-mirzakhani-3.preview.emergentagent.com/api
```

### Endpoints

#### 1. Health Check
```
GET /api/
Respuesta: {"message": "Hello World"}
```

#### 2. Crear Status Check
```
POST /api/status
Body: {
  "client_name": "string"
}
Respuesta: {
  "id": "uuid",
  "client_name": "string",
  "timestamp": "datetime"
}
```

#### 3. Obtener Status Checks
```
GET /api/status
Respuesta: [
  {
    "id": "uuid",
    "client_name": "string",
    "timestamp": "datetime"
  }
]
```

---

## 🗄️ ESTRUCTURA DE BASE DE DATOS

### Database: test_database

#### Colección: status_checks
```javascript
{
  "_id": ObjectId,  // MongoDB auto-generado
  "id": "uuid-string",
  "client_name": "string",
  "timestamp": "ISO-8601-datetime-string"
}
```

---

## 🎨 COMPONENTES UI DISPONIBLES (shadcn/ui)

El proyecto incluye los siguientes componentes de shadcn/ui instalados:

- Accordion
- Alert Dialog
- Avatar
- Button
- Checkbox
- Dialog
- Dropdown Menu
- Form (con react-hook-form)
- Input
- Label
- Select
- Tabs
- Toast/Sonner
- Tooltip
- Y muchos más...

Ubicación: `/app/frontend/src/components/ui/`

---

## 📝 NOTAS IMPORTANTES

1. **Hot Reload**: Ambos frontend y backend tienen hot reload habilitado
2. **CORS**: Configurado para aceptar todas las orígenes (*)
3. **MongoDB**: Usa Motor (driver asíncrono) para operaciones no bloqueantes
4. **Routing**: React Router configurado para SPA
5. **Estilos**: Tailwind CSS con tema personalizable (modo claro/oscuro)
6. **API Keys**: Usa variables de entorno (.env) para configuración sensible

---

## 🔐 VARIABLES DE ENTORNO

### Backend (.env)
- `MONGO_URL`: URL de conexión a MongoDB
- `DB_NAME`: Nombre de la base de datos
- `CORS_ORIGINS`: Orígenes permitidos para CORS

### Frontend (.env)
- `REACT_APP_BACKEND_URL`: URL del backend
- `WDS_SOCKET_PORT`: Puerto para WebSocket dev server
- `ENABLE_HEALTH_CHECK`: Flag para health checks

---

## 📦 DEPENDENCIAS PRINCIPALES

### Backend (Python)
- FastAPI 0.110.1
- Motor 3.3.1 (MongoDB async)
- Pydantic 2.6.4+
- Uvicorn 0.25.0

### Frontend (JavaScript)
- React 19.0.0
- React Router 7.5.1
- Axios 1.8.4
- Tailwind CSS 3.4.17
- Radix UI (componentes)
- Lucide React (iconos)

---

## 🎯 CARACTERÍSTICAS ACTUALES

✅ Aplicación Full-Stack funcional
✅ API REST con FastAPI
✅ Base de datos MongoDB configurada
✅ Frontend React moderno
✅ Sistema de diseño con Tailwind CSS
✅ Componentes UI de shadcn/ui
✅ Hot reload en desarrollo
✅ CORS configurado
✅ Routing con React Router
✅ Variables de entorno configuradas

---

## 🚀 PRÓXIMOS PASOS SUGERIDOS

1. Agregar más páginas (About, Contact, Services)
2. Implementar autenticación de usuarios
3. Crear dashboard administrativo
4. Agregar formularios con validación
5. Integrar servicios externos (email, pagos, etc.)
6. Mejorar el diseño visual de la landing page
7. Agregar animaciones y transiciones
8. Implementar SEO y meta tags
9. Agregar tests unitarios y de integración
10. Optimizar para producción

---

**Última actualización:** 11 de marzo de 2026
**Creado con:** Emergent AI
