'use client'; // Ensure client-side rendering

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' in the App Router

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out effect
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, first_name, last_name, email, password, password2 } = formData;

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/register/', {
        username,
        first_name,
        last_name,
        email,
        password,
        password2,
      });

      // Clear error if successful
      setError('');

      // Trigger fade-out effect
      setIsFadingOut(true);

      // Delay the redirect to allow the fade-out animation to play
      setTimeout(() => {
        router.push('/login'); // Redirect to login page after registration
      }, 1000); // Delay for 1 second
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div style={isFadingOut ? { ...styles.container, ...styles.fadeOut } : styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Register</h1>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your first name"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your last name"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirm your password"
            />
          </div>
          <p>Already have an account ? <a href="/login"> Login</a></p>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Register</button>
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
    width: '300px', // Smaller form container
    padding: '2rem', // Reduced padding
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Slightly lighter shadow
    transform: 'scale(0.8)',
    animation: 'popUp 1.2s ease forwards',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: '2rem', // Reduced heading size
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '1.5rem', // Reduced margin
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
    marginBottom: '1rem', // Reduced spacing between inputs
    width: '100%',
  },
  label: {
    fontSize: '0.9rem', // Slightly smaller labels
    marginBottom: '0.4rem', // Reduced margin
    display: 'block',
    color: '#e0e0e0',
  },
  input: {
    width: '100%',
    padding: '0.5rem', // Smaller input fields
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#1C1C2D',  // Darker background for input field
    color: '#ffffff',  // White text inside input
    fontSize: '0.9rem', // Slightly smaller font size
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '0.8rem', // Slightly reduced error spacing
  },
  button: {
    padding: '0.5rem', // Reduced button size
    backgroundColor: '#283593',  // Dark blue button color
    color: '#ffffff',
    fontSize: '0.9rem', // Slightly smaller font size
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    animation: 'fadeInUp 1s ease forwards 1.5s',
    width: '100%',
    marginTop: '0.8rem', // Reduced top margin
  },
};

// CSS animations
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


