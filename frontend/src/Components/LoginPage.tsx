import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/Logos/logo.svg';
import { useUser } from '../Context/UserContext';

interface LoginPageProps {
  authType: 'login' | 'signup';
}

const LoginPage: React.FC<LoginPageProps> = ({ authType }) => {
  const navigate = useNavigate();
  const { login, register, user } = useUser();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Signup form state
  const [signupStep, setSignupStep] = useState(1);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [country, setCountry] = useState('Tunisia');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSignup, setIsSignup] = useState(authType === 'signup');

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/Admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setErrorMessage(result.message || 'Login failed. Please check your credentials.');
      }
      // No need to navigate here - the useEffect will handle redirection once user state is updated
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleDobVerification = (e: React.FormEvent) => {
    e.preventDefault();
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const isOver18 = (age > 18) || (age === 18 && monthDiff >= 0 && today.getDate() >= birthDate.getDate());
    
    if (isOver18) {
      setSignupStep(2);
    } else {
      setErrorMessage("You must be at least 18 years old to sign up.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      const birthdate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      const result = await register({
        email: signupEmail,
        username,
        password: signupPassword,
        first_name: firstName,
        last_name: lastName,
        birthdate,
        country,
      });
      
      if (result.success) {
        // Show success message and redirect to login
        setIsSignup(false);
        setErrorMessage('');
        alert('Registration successful! Please login to continue.');
      } else {
        setErrorMessage(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <div className="login-page-wrapper">
      <div className="back-arrow-container">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 100 100" 
          className="back-arrow"
          onClick={handleBack}
        >
          <circle cx="50" cy="50" r="45" fill="#333333"/>
          <path 
            d="M60 25 L30 50 L60 75" 
            stroke="white" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
          />
        </svg>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="logo-container">
            <img src={Logo} alt="Prestewi Logo" className="logo" />
          </div>

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <div className="form-wrapper">
            <div className={`form-content ${!isSignup ? 'active' : 'inactive'}`}>
              <h1 className="login-title">LOG IN</h1>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email" className="input-label">E-MAIL</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="input-label">PASSWORD</label>
                  <div className="password-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="forgot-password-container">
                    <a href="#" className="forgot-password-link">FORGET YOUR PASSWORD?</a>
                  </div>
                </div>

                <button type="submit" className="login-button">LOG IN</button>
              </form>
            </div>

            <div className={`form-content ${isSignup && signupStep === 1 ? 'active' : 'inactive'}`}>
              <h1 className="login-title">SIGN UP</h1>
              <p className="signup-info">
                Please enter your date of birth to ensure a safe experience.
              </p>
              <form onSubmit={handleDobVerification}>
                <div className="form-group">
                  <label className="input-label">Date of birth</label>
                  <div className="date-of-birth-container">
                    <div className="date-select-wrapper">
                      <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="date-select"
                        required
                      >
                        <option value="" disabled>Day</option>
                        {days.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div className="date-select-wrapper">
                      <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="date-select"
                        required
                      >
                        <option value="" disabled>Month</option>
                        {months.map((m, index) => (
                          <option key={m} value={(index + 1).toString()}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div className="date-select-wrapper">
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="date-select"
                        required
                      >
                        <option value="" disabled>Year</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="login-button">Continue</button>
              </form>
            </div>

            <div className={`form-content ${isSignup && signupStep === 2 ? 'active' : 'inactive'}`}>
              <h1 className="login-title">SIGN UP</h1>
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label className="input-label">Country</label>
                  <div className="select-wrapper">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="input-field country-select"
                      required
                    >
                      <option value="Tunisia">Tunisia</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="signup-email" className="input-label">E-MAIL</label>
                  <input
                    type="email"
                    id="signup-email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="first-name" className="input-label">First name</label>
                    <input
                      type="text"
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="last-name" className="input-label">Last name</label>
                    <input
                      type="text"
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username" className="input-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-password" className="input-label">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="terms-checkbox">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      required
                    />
                    <span className="checkbox-custom"></span>
                    <span className="terms-label">
                      I accept the <a href="#" className="terms-link">Terms of Service</a> and{' '}
                      <a href="#" className="terms-link">EULA</a>
                    </span>
                  </label>
                </div>

                <button type="submit" className="login-button">Continue</button>
              </form>
            </div>
          </div>

          <div className="login-toggle">
            {isSignup ? (
              <p>Have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(false); }} className="login-link">LOG IN</a></p>
            ) : (
              <p>No account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(true); setSignupStep(1); }} className="login-link">SIGN UP</a></p>
            )}
          </div>

          <div className="privacy-container">
            <a href="#" className="privacy-link">Privacy Policy</a>
          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .login-page-wrapper {
          position: relative;
          min-height: 100vh;
          background-color: #101014;
          overflow-x: hidden;
        }

        .back-arrow-container {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 10;
        }

        .back-arrow {
          width: clamp(32px, 5vw, 40px);
          height: clamp(32px, 5vw, 40px);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .back-arrow:hover {
          transform: scale(1.1);
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
        }

        .login-card {
          width: 100%;
          max-width: 450px;
          padding: 2rem;
          border-radius: 12px;
          background-color: #18181C;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          margin-top: 2rem;
        }

        .logo {
          max-height: 100px;
          width: auto;
        }

        .error-message {
          background-color: rgba(255, 87, 87, 0.1);
          border-left: 3px solid #ff5757;
          color: #ff5757;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .login-title {
          text-align: center;
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: white;
          margin-bottom: 1.5rem;
        }

        .signup-info {
          text-align: center;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          color: #9e9e9e;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }

        .form-wrapper {
          min-height: 20rem;
          position: relative;
          overflow: hidden;
        }

        .form-content {
          transition: all 0.3s ease-in-out;
          width: 100%;
        }

        .form-content.active {
          opacity: 1;
          transform: translateX(0);
        }

        .form-content.inactive {
          opacity: 0;
          transform: translateX(100%);
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .form-group {
          margin-bottom: 1.5rem;
          width: 100%;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group.half {
          margin-bottom: 0;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #9e9e9e;
          margin-bottom: 0.5rem;
        }

        .input-field, .date-select, .date-input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 6px;
          background-color: #242428;
          border: 1px solid #5d5d61;
          color: white;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .input-field:focus, .date-select:focus, .date-input:focus {
          border-color: #2196f3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
          outline: none;
        }

        .country-select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding-right: 0.75rem;
        }

        .select-wrapper {
          position: relative;
        }

        .select-wrapper::after {
          content: '▼';
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9e9e9e;
          pointer-events: none;
        }

        .date-select::-webkit-scrollbar {
          width: 8px;
        }

        .date-select::-webkit-scrollbar-track {
          background: #242428;
        }

        .date-select::-webkit-scrollbar-thumb {
          background: #5d5d61;
          border-radius: 4px;
        }

        .date-select::-webkit-scrollbar-thumb:hover {
          background: #9e9e9e;
        }

        .date-select {
          scrollbar-width: thin;
          scrollbar-color: #5d5d61 #242428;
        }

        .password-container {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9e9e9e;
          font-size: 0.875rem;
          cursor: pointer;
          padding: 0.25rem;
        }

        .forgot-password-container {
          margin-top: 0.5rem;
          text-align: right;
        }

        .forgot-password-link {
          font-size: 0.75rem;
          color: white;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .forgot-password-link:hover {
          color: #42a5f5;
        }

        .date-of-birth-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.5rem;
        }

        .date-select-wrapper {
          position: relative;
        }

        .date-select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding-right: 2rem;
          cursor: pointer;
        }

        .date-select-wrapper::after {
          content: '▼';
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9e9e9e;
          pointer-events: none;
        }

        .terms-checkbox {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
          cursor: pointer;
          user-select: none;
        }

        .terms-checkbox input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .checkbox-custom {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #5d5d61;
          border-radius: 4px;
          background-color: #242428;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .terms-checkbox input:checked + .checkbox-custom {
          background-color: #2196f3;
          border-color: #2196f3;
        }

        .terms-checkbox input:checked + .checkbox-custom::after {
          content: '✓';
          color: white;
          font-size: 1rem;
          font-weight: bold;
        }

        .terms-label {
          font-size: 0.875rem;
          color: white;
          line-height: 1.4;
        }

        .terms-link {
          color: white;
          text-decoration: none;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        .login-button {
          width: 100%;
          padding: 0.875rem;
          background-color: #424242;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .login-button:hover {
          background-color: #616161;
        }

        .login-toggle {
          margin-top: 1.5rem;
          text-align: center;
          color: #9e9e9e;
          font-size: 0.875rem;
        }

        .login-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        .privacy-container {
          margin-top: 1rem;
          text-align: center;
        }

        .privacy-link {
          font-size: 0.75rem;
          color: white;
          text-decoration: none;
        }

        .privacy-link:hover {
          color: #42a5f5;
        }

        @media (max-width: 480px) {
          .back-arrow-container {
            top: 0.75rem;
            left: 0.75rem;
          }

          .login-card {
            padding: 1.5rem;
          }

          .form-row, .date-of-birth-container {
            grid-template-columns: 1fr;
          }

          .form-group.half {
            width: 100%;
          }

          .login-button {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;