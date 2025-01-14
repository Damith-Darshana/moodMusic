'use client'; // Ensure client-side rendering

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TokenContext from '../context/TokenContext';
import { useDispatch } from "react-redux";
import { fetchFavorites } from "@/redux/features/favoritesSlice";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const router = useRouter();
  const { saveToken } = useContext(TokenContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes popUp {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet); // Clean up the style element on unmount
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login/', {
        username,
        password,
      });

      saveToken(response.data.token);
      dispatch(fetchFavorites(response.data.token)); // Fetch and initialize favorites
      setIsFadingOut(true);

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={isFadingOut ? { ...styles.container, ...styles.fadeOut } : styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>MSS Login</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>
          <p>Need to join us ? <a href="/register"> Register</a></p>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}




const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    background: `linear-gradient(110deg, rgba(103, 11, 139, 0.9) 0%, rgba(7, 89, 85, 0.85) 40%, rgba(84, 105, 7, 0.35) 70%, rgba(212, 0, 255, 0.8) 100%), 
                 url('/images/background.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'right bottom',
    color: '#ffffff',
    overflow: 'hidden',
    animation: 'fadeIn 1.5s ease-in-out',
    transition: 'opacity 1s ease-in-out',
    opacity: 1,
  },
  fadeOut: {
    opacity: 0, // This will trigger the fade-out
  },
  formContainer: {
    width: '400px',
    padding: '3rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
    transform: 'scale(0.8)',
    animation: 'popUp 1.2s ease forwards',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '2rem',
    opacity: 0,
    animation: 'fadeInUp 1s ease forwards 0.8s',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    opacity: 0,
    animation: 'fadeInUp 1s ease forwards 1.2s',
    width: '100%',
  },
  inputGroup: {
    marginBottom: '1.5rem',
    width: '100%',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
    display: 'block',
    color: '#e0e0e0',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#1C1C2D',  // Darker background for input field
    color: '#ffffff',  // White text inside input
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#283593',  // Dark blue button color
    color: '#ffffff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    animation: 'fadeInUp 1s ease forwards 1.5s',
    width: '100%',
    marginTop: '1rem',
  },
};

// const styleSheet = document.createElement('style');
// styleSheet.type = 'text/css';
// styleSheet.innerText = `
//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   @keyframes fadeInUp {
//     from { opacity: 0; transform: translateY(30px); }
//     to { opacity: 1; transform: translateY(0); }
//   }

//   @keyframes popUp {
//     from { transform: scale(0.8); opacity: 0; }
//     to { transform: scale(1); opacity: 1; }
//   }
// `;
// document.head.appendChild(styleSheet);



