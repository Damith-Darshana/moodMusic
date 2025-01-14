# MoodMusic 🎵

MoodMusic is a web application built with Django for the backend (`MSS_Backend`) and a modern frontend framework (`MSS_Frontend`). This project aims to provide a seamless music streaming experience.

## 🔨 Folder Structure

- **`MSS_Backend/`**: Contains the Django backend for handling the server-side functionality.
- **`MSS_Frontend/`**: Contains the frontend application to serve user interfaces.
- **`README.md`**: Instructions for setting up and running the project.

---

## 🚀 Getting Started

### **Prerequisites**
Ensure you have the following installed on your machine:
- Python 3.9+ (for the backend)
- Node.js and npm (for the frontend)
- Git

---

### **Cloning the Repository**
1. Open your terminal or command prompt.
2. Clone this repository:
   ```bash
   git clone https://github.com/Damith-Darshana/moodMusic.git
   ```
3. Navigate into the project directory:
   ```bash
   cd moodMusic
   ```

---

## 🔅 Setting Up the Backend (`MSS_Backend`)

1. Navigate to the `MSS_Backend` directory:
   ```bash
   cd MSS_Backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # For macOS/Linux
   env\Scripts\activate     # For Windows
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (admin account):
   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python manage.py runserver
   ```
   The backend will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## 🌐 Setting Up the Frontend (`MSS_Frontend`)

1. Navigate to the `MSS_Frontend` directory:
   ```bash
   cd ../MSS_Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## 📞 Additional Notes

- **Environment Variables**:
  - Backend: Add a `.env` file in the `MSS_Backend` directory to set up required environment variables (e.g., database settings, secret key).
  - Frontend: Add environment-specific variables in the `.env` file under `MSS_Frontend`.

- **Static Files**:
  - Ensure to collect static files before deploying the Django project:
    ```bash
    python manage.py collectstatic
    ```

- **Database Setup**:
  - Use the default SQLite for local development, or configure the `DATABASES` setting in the Django project to use PostgreSQL/MySQL.

---

## 🛠️ Contributing
Feel free to fork this repository, make changes, and submit a pull request. Contributions are welcome!

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

### 🔗 Repository Link
[https://github.com/Damith-Darshana/moodMusic](https://github.com/Damith-Darshana/moodMusic)
