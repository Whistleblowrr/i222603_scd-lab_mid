# Hospital Appointment Management System (HAMS)

This repository contains the full-stack Hospital Appointment Management System. The system features a React-based frontend for patients to book appointments and a Node.js/Express backend API. 

This guide provides the complete setup and deployment instructions for a **Windows 10** environment, ensuring high availability, process monitoring, and reverse-proxy routing via Nginx.

## Architecture & Technology Stack
*   **Frontend**: React.js (Static Build)
*   **Backend**: Node.js, Express.js
*   **Process Manager**: PM2 (with pm2-windows-startup)
*   **Web Server / Reverse Proxy**: Nginx (Windows Mainline)

## Project Structure
```text
hospital-system/
├── backend/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── App.css
        └── index.js
```

## Deployment Prerequisites
*   **Node.js & npm** installed on the Windows system.
*   **Nginx for Windows** downloaded and extracted to `C:\nginx`.

---

## Step-by-Step Deployment Guide

### 1. Backend Setup & Process Management
The backend runs continuously in the background and is monitored for automatic recovery if it crashes.

1. Navigate to the backend directory and install dependencies:
   ```cmd
   cd hospital-system\backend
   npm install
   ```
2. Install PM2 globally to manage the Node.js process:
   ```cmd
   npm install -g pm2
   ```
3. Start the backend process using the required name (`i222603`):
   ```cmd
   pm2 start server.js --name i222603
   ```
4. **Configure Auto-Recovery on Boot:**
   ```cmd
   npm install -g pm2-windows-startup
   pm2-startup install
   pm2 save
   ```

### 2. Frontend Build Preparation
The frontend is compiled into static files to be served efficiently without requiring the Node.js backend to serve them.

1. Navigate to the frontend directory and install dependencies:
   ```cmd
   cd hospital-system\frontend
   npm install
   ```
2. Generate the optimized production build:
   ```cmd
   npm run build
   ```
   *(This creates a `build/` folder containing the static HTML, CSS, and JS files).*

### 3. Nginx Configuration & Routing
Nginx handles all incoming traffic on port 80. It serves the React static files directly and routes API requests to the backend process running on port 5000.

1. Open your Nginx configuration file located at `C:\nginx\conf\nginx.conf`.
2. Replace the default `server` block with the following configuration. **Important:** Update the `root` path to match the exact location of your frontend build folder (use forward slashes `/`).

```nginx
server {
    listen       80;
    server_name  localhost;

    # Serve React Frontend
    location / {
        root   "C:/path/to/your/hospital-system/frontend/build";
        index  index.html index.htm;
        try_files $uri /index.html;
    }

    # Route API requests to Node.js Backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000/; 
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. Start Nginx (or reload if it's already running):
   ```cmd
   cd C:\nginx
   start nginx
   # If already running, use: nginx -s reload
   ```

### 4. System Auto-Start Configuration (Nginx)
To ensure the Nginx server starts automatically alongside PM2 when the Windows server reboots:
1. Press `Win + R`, type `shell:startup`, and press Enter.
2. Create a new shortcut in this folder pointing to `C:\nginx\nginx.exe`.

---

## Testing and Verification

To ensure the system meets all deployment requirements, perform the following checks:

1. **Accessibility**: Open a browser and navigate to `http://localhost` (Port 80). The React dashboard should load without specifying a port.
2. **Frontend Functionality**: Verify that the list of available doctors is displayed correctly.
3. **API Routing**: Submit a new appointment request. Verify it appears in the schedule, confirming Nginx is successfully routing `/api/` traffic to the hidden Node.js backend.
4. **Process Identity**: Open Command Prompt and run `pm2 list`. Verify the backend is running strictly under the name `i222603`.
5. **Crash Recovery**: Open Task Manager, force-close the `node.exe` task. Run `pm2 list` again to verify PM2 automatically resurrected the process.
6. **Reboot Survival**: Restart the Windows machine. Upon logging in, open the browser directly to `http://localhost` to verify both Nginx and PM2 auto-started the complete application without manual intervention.# Hospital Appointment Management System (HAMS)

This repository contains the full-stack Hospital Appointment Management System. The system features a React-based frontend for patients to book appointments and a Node.js/Express backend API. 

This guide provides the complete setup and deployment instructions for a **Windows 10** environment, ensuring high availability, process monitoring, and reverse-proxy routing via Nginx.

## Architecture & Technology Stack
*   **Frontend**: React.js (Static Build)
*   **Backend**: Node.js, Express.js
*   **Process Manager**: PM2 (with pm2-windows-startup)
*   **Web Server / Reverse Proxy**: Nginx (Windows Mainline)

## Project Structure
```text
hospital-system/
├── backend/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── App.css
        └── index.js
```

## Deployment Prerequisites
*   **Node.js & npm** installed on the Windows system.
*   **Nginx for Windows** downloaded and extracted to `C:\nginx`.

---

## Step-by-Step Deployment Guide

### 1. Backend Setup & Process Management
The backend runs continuously in the background and is monitored for automatic recovery if it crashes.

1. Navigate to the backend directory and install dependencies:
   ```cmd
   cd hospital-system\backend
   npm install
   ```
2. Install PM2 globally to manage the Node.js process:
   ```cmd
   npm install -g pm2
   ```
3. Start the backend process using the required name (`i222603`):
   ```cmd
   pm2 start server.js --name i222603
   ```
4. **Configure Auto-Recovery on Boot:**
   ```cmd
   npm install -g pm2-windows-startup
   pm2-startup install
   pm2 save
   ```

### 2. Frontend Build Preparation
The frontend is compiled into static files to be served efficiently without requiring the Node.js backend to serve them.

1. Navigate to the frontend directory and install dependencies:
   ```cmd
   cd hospital-system\frontend
   npm install
   ```
2. Generate the optimized production build:
   ```cmd
   npm run build
   ```
   *(This creates a `build/` folder containing the static HTML, CSS, and JS files).*

### 3. Nginx Configuration & Routing
Nginx handles all incoming traffic on port 80. It serves the React static files directly and routes API requests to the backend process running on port 5000.

1. Open your Nginx configuration file located at `C:\nginx\conf\nginx.conf`.
2. Replace the default `server` block with the following configuration. **Important:** Update the `root` path to match the exact location of your frontend build folder (use forward slashes `/`).

```nginx
server {
    listen       80;
    server_name  localhost;

    # Serve React Frontend
    location / {
        root   "C:/path/to/your/hospital-system/frontend/build";
        index  index.html index.htm;
        try_files $uri /index.html;
    }

    # Route API requests to Node.js Backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000/; 
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. Start Nginx (or reload if it's already running):
   ```cmd
   cd C:\nginx
   start nginx
   # If already running, use: nginx -s reload
   ```

### 4. System Auto-Start Configuration (Nginx)
To ensure the Nginx server starts automatically alongside PM2 when the Windows server reboots:
1. Press `Win + R`, type `shell:startup`, and press Enter.
2. Create a new shortcut in this folder pointing to `C:\nginx\nginx.exe`.

---

## Testing and Verification

To ensure the system meets all deployment requirements, perform the following checks:

1. **Accessibility**: Open a browser and navigate to `http://localhost` (Port 80). The React dashboard should load without specifying a port.
2. **Frontend Functionality**: Verify that the list of available doctors is displayed correctly.
3. **API Routing**: Submit a new appointment request. Verify it appears in the schedule, confirming Nginx is successfully routing `/api/` traffic to the hidden Node.js backend.
4. **Process Identity**: Open Command Prompt and run `pm2 list`. Verify the backend is running strictly under the name `i222603`.
5. **Crash Recovery**: Open Task Manager, force-close the `node.exe` task. Run `pm2 list` again to verify PM2 automatically resurrected the process.
6. **Reboot Survival**: Restart the Windows machine. Upon logging in, open the browser directly to `http://localhost` to verify both Nginx and PM2 auto-started the complete application without manual intervention.