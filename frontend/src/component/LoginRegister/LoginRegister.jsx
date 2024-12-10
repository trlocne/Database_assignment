import React from 'react';
import './styles.css';
import api from '../../hooks/api';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, useNavigate } from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    // other hooks
  
    return (
      <WrappedComponent
        {...props}
        {...{ navigate, /* other hooks */ }}
      />
    );
  };

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginPassword: false,
            showRegisterPassword: false,
            showConfirmPassword: false,
            loginData: {
                emailOrUsername: '',
                password: '',
                rememberMe: false
            },
            registerData: {
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
                fullname: '',
                role: '',
            }
        };
    }

    handleLoginChange = (e) => {
        const { name, value, type, checked } = e.target;
        this.setState(prevState => ({
            loginData: {
                ...prevState.loginData,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    }

    handleRegisterChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            registerData: {
                ...prevState.registerData,
                [name]: value
            }
        }));
    }

    handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Data:', this.state.loginData);
        try {
            const response = await api.post('/auth/public/login', {
                username: this.state.loginData?.emailOrUsername,
                password: this.state.loginData?.password,
            });
            console.log(response.data);
            if (response.data.status == 200) {
                localStorage.setItem("JWT_TOKEN", response.data.data.jwtToken);
                localStorage.setItem("ROLE", response.data.data.role)
                // this.props.navigate("/"); // use navigate here
                const { navigate } = this.props;
                navigate("/");
            } else {
                toast.error("Sai tài khoản hoặc mật khẩu.");
                return;
            }
          }
          catch(error){
            toast.error("Lỗi đăng nhập");
            return;
        }  
        toast.success("Đăng nhập thành công!");
    }

    handleRegisterSubmit = (e) => {
        e.preventDefault();
        api.post('/auth/public/signup', {
            username: this.state.registerData?.username,
            password: this.state.registerData?.password,
            fullName: this.state.registerData?.fullname,
            gender: this.state.registerData?.gender === 'female' ? 'F' : 'T',
            role: this.state.registerData?.role
        }).then(response => {
            toast.success("Đăng kí thành công!");
        }).catch(error => {
            console.log(error);
            toast.error("Đăng kí thất bại!");
        })
    }

    togglePasswordVisibility = (field) => {
        this.setState(prevState => ({
            [field]: !prevState[field]
        }));
    }

    render() {
        const { 
            showLoginPassword, 
            showRegisterPassword, 
            showConfirmPassword,
            loginData,
            registerData
        } = this.state;

        return (
            <div className="container">
                <ToastContainer />
                <nav className="breadcrumb">
                    <a href="/">Homepage</a>
                    <span> / </span>
                    <span>Login / Register</span>
                </nav>

                <div className="form-container">
                    {/* Login Form */}
                    <div className="form-box">
                        <h2>Login</h2>
                        <form onSubmit={this.handleLoginSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="emailOrUsername"
                                    placeholder="Email or username*"
                                    value={loginData.emailOrUsername}
                                    onChange={this.handleLoginChange}
                                    required
                                />
                            </div>

                            <div className="form-group password-field">
                                <input
                                    type={showLoginPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password*"
                                    value={loginData.password}
                                    onChange={this.handleLoginChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => this.togglePasswordVisibility('showLoginPassword')}
                                >
                                    👁️
                                </button>
                            </div>

                            <div className="form-group checkbox">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={loginData.rememberMe}
                                    onChange={this.handleLoginChange}
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>

                            <button type="submit" className="submit-btn">Login</button>

                            <div className="forgot-password">
                                <a href="#">Lost your password?</a>
                            </div>
                        </form>
                    </div>

                    {/* Register Form */}
                    <div className="form-box">
                        <h2>Register</h2>
                        <form onSubmit={this.handleRegisterSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name*"
                                    value={registerData.fullname}
                                    onChange={this.handleRegisterChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username*"
                                    value={registerData.username}
                                    onChange={this.handleRegisterChange}
                                    required
                                />
                            </div>

                            <div className="form-group flex flex-row">
                                <select
                                    name="role"
                                    value={registerData.role}
                                    onChange={this.handleRegisterChange}
                                    required
                                >
                                    <option value="" disabled>Select Role*</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="LEANER">LEARNER</option>
                                    <option value="TEACHER">TEACHER</option>
                                </select>

                                <select
                                    name="gender"
                                    value={registerData.gender}
                                    onChange={this.handleRegisterChange}
                                    required
                                >
                                    <option value="" disabled>Select Gender*</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="form-group password-field">
                                <input
                                    type={showRegisterPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password*"
                                    value={registerData.password}
                                    onChange={this.handleRegisterChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => this.togglePasswordVisibility('showRegisterPassword')}
                                >
                                    👁️
                                </button>
                            </div>

                            <div className="form-group password-field">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password*"
                                    value={registerData.confirmPassword}
                                    onChange={this.handleRegisterChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => this.togglePasswordVisibility('showConfirmPassword')}
                                >
                                    👁️
                                </button>
                            </div>

                            <button type="submit" className="submit-btn">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// Exporting the component wrapped with the HOC
export default withRouter(LoginRegister);