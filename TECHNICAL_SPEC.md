# LST (Let's Talk) - Technical Specification Document

## Version: 1.0  
**Last Updated:** March 2026  
**Purpose:** Technical reference for the LST application development team

---

## Table of Contents

1. [Technical Architecture Overview](#1-technical-architecture-overview)
2. [API Integration Points](#2-api-integration-points)
3. [Database Schema](#3-database-schema)
4. [Frontend-Backend Integration](#4-frontend-backend-integration)
5. [PWA Configuration](#5-pwa-configuration)

---

## 1. Technical Architecture Overview

### 1.1 System Architecture

The LST application follows a modern three-tier architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React 18)                       │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────────────┐   │
│  │  PWA    │  │  Router  │  │ Context │  │ Socket.io Client │   │
│  │ Support │  │          │  │   API   │  │                  │   │
│  └─────────┘  └──────────┘  └─────────┘  └──────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / WebSocket
┌────────────────────────────▼────────────────────────────────────┐
│                       BACKEND (Express.js)                       │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────────────┐   │
│  │  Auth   │  │   REST   │  │ Socket  │  │     Middleware   │   │
│  │ Routes  │  │   API    │  │  .io    │  │   (JWT, Error)   │   │
│  └─────────┘  └──────────┘  └─────────┘  └──────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    DATABASE (MongoDB + Mongoose)                 │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────────────┐   │
│  │  User   │  │  Topic   │  │ Message │  │   Notification   │   │
│  │ Model   │  │  Model   │  │  Model  │  │      Model       │   │
│  └─────────┘  └──────────┘  └─────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

#### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | Core UI framework |
| React Router | 6.x | Client-side routing |
| Socket.io Client | 4.x | Real-time communication |
| Vite | 5.x | Build tool and dev server |
| Workbox | 7.x | Service Worker for PWA |

#### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x+ | JavaScript runtime |
| Express.js | 4.x | Web application framework |
| Mongoose | 8.x | MongoDB object modeling |
| Socket.io | 4.x | Real-time bidirectional communication |
| JWT | 9.x | Token-based authentication |
| Bcrypt | 5.x | Password hashing |

#### Database

| Technology | Purpose |
|------------|---------|
| MongoDB | Primary document database |
| Mongoose | ODM for schema validation and queries |

### 1.3 Project Structure

```
lst/
├── frontend/                    # React frontend application
│   ├── public/
│   │   ├── manifest.json       # PWA manifest
│   │   └── sw.js               # Service Worker
│   └── src/
│       ├── assets/             # Static assets (images, fonts)
│       ├── components/         # Reusable React components
│       ├── context/            # React Context providers
│       ├── hooks/              # Custom React hooks
│       ├── pages/              # Page components
│       ├── services/           # API service layer
│       │   ├── api.js          # Axios instance configuration
│       │   ├── authService.js  # Authentication endpoints
│       │   ├── topicService.js # Topic CRUD operations
│       │   ├── messageService.js # Message operations
│       │   └── socketService.js # Socket.io management
│       ├── utils/              # Utility functions
│       ├── App.jsx             # Root component
│       └── main.jsx            # Entry point
│
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/        # Express middleware
│   │   │   ├── auth.js         # JWT authentication
│   │   │   └── errorHandler.js # Error handling
│   │   ├── models/             # Mongoose models
│   │   ├── routes/             # API route definitions
│   │   ├── services/           # Business logic
│   │   └── app.js              # Express app setup
│   └── package.json
│
└── TECHNICAL_SPEC.md           # This document
```

---

## 2. API Integration Points

### 2.1 Base URL Configuration

| Environment | API Base URL | WebSocket URL |
|-------------|--------------|---------------|
| Development | `http://localhost:5000/api` | `http://localhost:5000` |
| Production | `https://api.lst-app.com/api` | `https://api.lst-app.com` |

### 2.2 Authentication Routes

Base Path: `/api/auth`

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| POST | `/register` | Register new user | No | `{ username, email, password }` |
| POST | `/login` | User login | No | `{ email, password }` |
| POST | `/logout` | User logout | Yes | - |
| POST | `/refresh-token` | Refresh access token | No (refresh token) | `{ refreshToken }` |
| GET | `/verify` | Verify current token | Yes | - |

**Response Structure:**

```json
// Success Response
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "AUTH_001",
    "message": "Invalid credentials"
  }
}
```

### 2.3 User Routes

Base Path: `/api/users`

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/profile` | Get current user profile | Yes | - |
| PUT | `/profile` | Update current user profile | Yes | `{ username?, avatar?, bio? }` |
| GET | `/:id` | Get user by ID | Yes | - |
| GET | `/:id/topics` | Get user's topics | Yes | - |
| PUT | `/:id/avatar` | Update user avatar | Yes | FormData (file) |

### 2.4 Topic Routes

Base Path: `/api/topics`

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/` | Get all topics | Yes | Query: `?page=1&limit=20&category=...` |
| POST | `/` | Create new topic | Yes | `{ title, content, category, startTime?, endTime? }` |
| GET | `/:id` | Get topic by ID | Yes | - |
| PUT | `/:id` | Update topic | Yes | `{ title?, content?, category? }` |
| DELETE | `/:id` | Delete topic | Yes | - |
| POST | `/:id/archive` | Archive topic | Yes | - |
| GET | `/:id/messages` | Get topic messages | Yes | - |
| POST | `/:id/participants` | Add participant | Yes | `{ userId }` |

**Query Parameters for GET /:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number for pagination |
| limit | number | 20 | Items per page |
| category | string | - | Filter by category |
| author | string | - | Filter by author ID |
| isArchived | boolean | false | Include archived topics |
| search | string | - | Search in title/content |

### 2.5 Message Routes

Base Path: `/api/messages`

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| POST | `/` | Create new message | Yes | `{ content, topicId, parentId? }` |
| GET | `/topic/:topicId` | Get messages for topic | Yes | Query: `?page=1&limit=50` |
| PUT | `/:id` | Edit message | Yes | `{ content }` |
| DELETE | `/:id` | Delete message | Yes | - |
| GET | `/:id/replies` | Get message replies | Yes | - |

### 2.6 Thread Routes

Base Path: `/api/threads`

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/:messageId` | Get thread for message | Yes | - |
| POST | `/:messageId/reply` | Create reply in thread | Yes | `{ content }` |
| GET | `/:messageId/replies` | Get all replies | Yes | `?page=1&limit=30` |

### 2.7 Notification Routes

Base Path: `/api/notifications`

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/` | Get user notifications | Yes | Query: `?page=1&limit=20` |
| PUT | `/:id/read` | Mark notification as read | Yes | - |
| PUT | `/read-all` | Mark all as read | Yes | - |
| DELETE | `/:id` | Delete notification | Yes | - |
| DELETE | `/clear` | Clear all notifications | Yes | - |

### 2.8 Global/Chat Routes

Base Path: `/api/chat`

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/messages` | Get global chat messages | Yes | Query: `?page=1&limit=50` |
| POST | `/message` | Send global message | Yes | `{ content }` |
| GET | `/online-users` | Get online users | Yes | - |

### 2.9 Error Codes

| Code | Description |
|------|-------------|
| AUTH_001 | Invalid credentials |
| AUTH_002 | Token expired |
| AUTH_003 | Token not provided |
| AUTH_004 | User not found |
| TOPIC_001 | Topic not found |
| TOPIC_002 | Unauthorized to modify topic |
| MESSAGE_001 | Message not found |
| MESSAGE_002 | Cannot edit others' messages |
| USER_001 | User already exists |
| USER_002 | Invalid email format |
| VALIDATION_001 | Validation error |

---

## 3. Database Schema

### 3.1 MongoDB Connection

```javascript
// Connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lst-app';

// Connection Options
{
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}
```

### 3.2 User Model

**Collection:** `users`

```javascript
{
  // Primary Fields
  _id: ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false // Never returned in queries by default
  },
  
  // Profile Fields
  avatar: {
    type: String,
    default: '/assets/default-avatar.png'
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  
  // Status Fields
  isOnline: {
    type: Boolean,
    default: false
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes
{ username: 1 }
{ email: 1 }
{ createdAt: -1 }
```

### 3.3 Topic Model

**Collection:** `topics`

```javascript
{
  // Primary Fields
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  category: {
    type: String,
    enum: ['general', 'technology', 'sports', 'entertainment', 'education', 'business', 'health', 'politics'],
    default: 'general'
  },
  
  // Author Reference
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  
  // Time Constraints
  startTime: {
    type: Date,
    default: null // null means topic is always active
  },
  endTime: {
    type: Date,
    default: null // null means topic has no end
  },
  
  // Participants
  participants: [{
    type: ObjectId,
    ref: 'User'
  }],
  
  // Status
  isArchived: {
    type: Boolean,
    default: false
  },
  
  // Counters
  messageCount: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes
{ category: 1, isArchived: 1 }
{ author: 1 }
{ createdAt: -1 }
{ 'participants': 1 }
```

### 3.4 Message Model

**Collection:** `messages`

```javascript
{
  // Primary Fields
  _id: ObjectId,
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  
  // Author Reference
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  
  // Topic Reference
  topicId: {
    type: ObjectId,
    ref: 'Topic',
    required: true
  },
  
  // Threading (Parent Message for Replies)
  parentId: {
    type: ObjectId,
    ref: 'Message',
    default: null
  },
  
  // Reply Count (for parent messages)
  replyCount: {
    type: Number,
    default: 0
  },
  
  // Reactions
  reactions: [{
    user: {
      type: ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      enum: ['like', 'love', 'laugh', 'sad', 'angry']
    }
  }],
  
  // Edit Tracking
  isEdited: {
    type: Boolean,
    default: false
  },
  
  // Soft Delete
  isDeleted: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes
{ topicId: 1, createdAt: -1 }
{ parentId: 1, createdAt: -1 }
{ author: 1 }
```

### 3.5 Notification Model

**Collection:** `notifications`

```javascript
{
  // Primary Fields
  _id: ObjectId,
  type: {
    type: String,
    enum: [
      'new_message',      // New message in a topic
      'reply',            // Reply to user's message
      'mention',          // User mentioned
      'topic_invite',     // Invited to a topic
      'new_participant',  // New user joined topic
      'system'            // System notifications
    ],
    required: true
  },
  
  // User Reference
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  
  // Notification Content
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  content: {
    type: String,
    maxlength: 500
  },
  
  // Related Entity References
  sender: {
    type: ObjectId,
    ref: 'User'
  },
  topicId: {
    type: ObjectId,
    ref: 'Topic'
  },
  messageId: {
    type: ObjectId,
    ref: 'Message'
  },
  
  // Status
  isRead: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes
{ user: 1, isRead: 1, createdAt: -1 }
```

### 3.6 Refresh Token Model

**Collection:** `refreshtokens`

```javascript
{
  _id: ObjectId,
  token: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## 4. Frontend-Backend Integration

### 4.1 API Service Layer Structure

The frontend uses an Axios-based service layer for clean API integration:

```
src/services/
├── api.js              # Axios instance with interceptors
├── authService.js      # Authentication endpoints
├── userService.js      # User management
├── topicService.js     # Topic CRUD operations
├── messageService.js   # Message operations
├── notificationService.js # Notifications
└── socketService.js   # Socket.io management
```

#### API Client Configuration (`api.js`)

```javascript
// Base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await authService.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

### 4.2 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. REGISTER                                                     │
│  ┌──────────┐     POST /api/auth/register    ┌──────────────┐  │
│  │  Client  │ ──────────────────────────────► │   Backend    │  │
│  │          │ ◄────────────────────────────── │              │  │
│  └──────────┘    { user, accessToken,        └──────────────┘  │
│                  refreshToken }                                │
│                                                                  │
│  2. LOGIN                                                        │
│  ┌──────────┐     POST /api/auth/login     ┌──────────────┐   │
│  │  Client  │ ─────────────────────────────► │   Backend    │   │
│  │          │ ◄────────────────────────────── │              │   │
│  └──────────┘    { user, accessToken,       └──────────────┘   │
│                  refreshToken }                                │
│                                                                  │
│  3. TOKEN STORAGE                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Access Token:  localStorage (short-lived, 15 min)       │  │
│  │  Refresh Token: httpOnly cookie (long-lived, 7 days)     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  4. TOKEN REFRESH (Automatic)                                   │
│  ┌──────────┐                                                   │
│  │  401     │ ──► POST /api/auth/refresh-token ──► New Token  │
│  │  Error   │ ◄─────────────────────────────────────             │
│  └──────────┘                                                   │
│                                                                  │
│  5. LOGOUT                                                       │
│  ┌──────────┐     POST /api/auth/logout    ┌──────────────┐   │
│  │  Client  │ ─────────────────────────────► │   Backend    │   │
│  │          │     Clear tokens locally      │  Clear DB    │   │
│  └──────────┘                                └──────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Auth Service Methods

```javascript
// authService.js
export const authService = {
  // Get stored tokens
  getAccessToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => cookies.get('refreshToken'),
  
  // Save tokens
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    cookies.set('refreshToken', refreshToken, { httpOnly: true });
  },
  
  // Clear tokens
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    cookies.remove('refreshToken');
  },
  
  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken } = response.data.data;
    authService.setTokens(accessToken, refreshToken);
    return user;
  },
  
  // Register
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data.data;
  },
  
  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      authService.clearTokens();
    }
  },
  
  // Refresh token
  refreshToken: async () => {
    const refreshToken = authService.getRefreshToken();
    const response = await api.post('/auth/refresh-token', { refreshToken });
    const { accessToken } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  },
  
  // Verify token
  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data.data;
  }
};
```

### 4.3 Real-time Socket Events

Socket.io enables real-time features like live messaging and notifications:

```javascript
// socketService.js
import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    const token = authService.getAccessToken();
    
    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    this.setupEventHandlers();
    return this.socket;
  }

  setupEventHandlers() {
    // Connection events
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
    });
  }

  // Emit events
  emitJoinTopic(topicId) {
    this.socket.emit('join-topic', { topicId });
  }

  emitLeaveTopic(topicId) {
    this.socket.emit('leave-topic', { topicId });
  }

  emitNewMessage(message) {
    this.socket.emit('new-message', message);
  }

  emitTyping(data) {
    this.socket.emit('typing', data);
  }

  // Listen for events
  onNewMessage(callback) {
    this.socket.on('new-message', callback);
  }

  onMessageUpdated(callback) {
    this.socket.on('message-updated', callback);
  }

  onMessageDeleted(callback) {
    this.socket.on('message-deleted', callback);
  }

  onUserTyping(callback) {
    this.socket.on('user-typing', callback);
  }

  onNotification(callback) {
    this.socket.on('notification', callback);
  }

  onUserOnline(callback) {
    this.socket.on('user-online', callback);
  }

  onUserOffline(callback) {
    this.socket.on('user-offline', callback);
  }

  // Cleanup
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}

export const socketService = new SocketService();
```

#### Socket Events Reference

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `join-topic` | Client → Server | `{ topicId }` | Join topic room |
| `leave-topic` | Client → Server | `{ topicId }` | Leave topic room |
| `new-message` | Client → Server | `{ topicId, content, parentId }` | Send message |
| `typing` | Client → Server | `{ topicId, isTyping }` | Typing indicator |
| `new-message` | Server → Client | `{ message }` | Receive new message |
| `message-updated` | Server → Client | `{ messageId, content }` | Message edited |
| `message-deleted` | Server → Client | `{ messageId }` | Message deleted |
| `user-typing` | Server → Client | `{ userId, topicId }` | User typing |
| `notification` | Server → Client | `{ notification }` | New notification |
| `user-online` | Server → Client | `{ userId }` | User came online |
| `user-offline` | Server → Client | `{ userId }` | User went offline |

### 4.4 State Management Approach

The application uses React Context API for global state management:

```
src/context/
├── AuthContext.jsx      # Authentication state
├── TopicContext.jsx     # Topics state
├── MessageContext.jsx   # Messages state
├── NotificationContext.jsx # Notifications state
└── SocketContext.jsx    # Socket connection state
```

#### Auth Context Example

```javascript
// AuthContext.jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const initAuth = async () => {
      const token = authService.getAccessToken();
      if (token) {
        try {
          const userData = await authService.verifyToken();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          authService.clearTokens();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

## 5. PWA Configuration

### 5.1 Web App Manifest

The manifest file (`public/manifest.json`) enables PWA installation:

```json
{
  "name": "Let's Talk - LST",
  "short_name": "LST",
  "description": "A real-time discussion platform for meaningful conversations",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4F46E5",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "en",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["social", "networking"],
  "shortcuts": [
    {
      "name": "Explore Topics",
      "short_name": "Explore",
      "url": "/explore",
      "icons": [{ "src": "/icons/explore.png", "sizes": "96x96" }]
    },
    {
      "name": "Global Chat",
      "short_name": "Chat",
      "url": "/chat",
      "icons": [{ "src": "/icons/chat.png", "sizes": "96x96" }]
    },
    {
      "name": "Notifications",
      "short_name": "Alerts",
      "url": "/notifications",
      "icons": [{ "src": "/icons/notification.png", "sizes": "96x96" }]
    }
  ]
}
```

### 5.2 Service Worker Setup

The service worker provides offline capabilities and caching:

```javascript
// public/sw.js
const CACHE_NAME = 'lst-v1';
const STATIC_CACHE = 'lst-static-v1';
const DYNAMIC_CACHE = 'lst-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Network first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API requests - Network only
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return new Response(
            JSON.stringify({ error: 'Offline', offline: true }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }

  // Static assets - Cache first
  if (url.pathname.startsWith('/icons') || 
      url.pathname.startsWith('/assets') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // HTML pages - Network first
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => {
        return cached || caches.match('/offline.html');
      }))
  );
});

// Background sync for offline messages
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  // Implementation for offline message queue
}
```

### 5.3 Registering the Service Worker

```javascript
// src/main.jsx or src/index.jsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('Service Worker registered:', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content available
            showUpdateNotification();
          }
        });
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  });
}
```

### 5.4 Offline Capabilities

| Feature | Implementation | Behavior |
|---------|---------------|----------|
| App Shell | Static caching | Instant load on repeat visits |
| API Requests | Network only with error response | Graceful degradation |
| Messages | Offline queue with background sync | Send when online |
| Topic List | Cache with network update | Show cached, then refresh |
| User Data | Memory/Context | Requires re-auth |

### 5.5 PWA Installation Detection

```javascript
// Detect PWA installation prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show custom install button
  showInstallButton();
});

async function handleInstall() {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    hideInstallButton();
  }
  deferredPrompt = null;
}

// Detect if already installed
window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
  if (e.matches) {
    // App is installed
    hideInstallButton();
  }
});
```

---

## Appendix: Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=LST
VITE_APP_VERSION=1.0.0
```

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lst-app
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | LST Team | Initial technical specification |

---

*This document serves as the technical reference for the LST application development team. All team members should familiarize themselves with these specifications before beginning development.*
