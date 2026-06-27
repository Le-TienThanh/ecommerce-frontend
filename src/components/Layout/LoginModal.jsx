import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, LocateIcon, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toggleAuthPopup } from '../../store/slices/popupSlice.js';
import {
    forgotPassword,
    login,
    register,
    resetPassword,
} from '../../store/slices/authSlice.js';

const LoginModal = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { authUser, isSigningUp, isLoggingIn, isRequestingForToken } =
        useSelector((state) => state.auth);
    const { isAuthPopupOpen } = useSelector((state) => state.popup);
    const [mode, setMode] = useState('signin'); // signin || signup || forgot || reset
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    // Detect reset password URL and open popup with reset mode
    useEffect(() => {
        if (location.pathname.startsWith('/password/reset/')) {
            setMode('reset');
            dispatch(toggleAuthPopup());
        }
    }, [location.pathname, dispatch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);
        if (mode === 'signup') {
            data.append('name', formData.name);
        }
        if (mode === 'forgot') {
            // chay o cong 5173
            dispatch(forgotPassword({ email: formData.email, frontEndUrl: 'http://localhost:5173' })).then(() => {
                dispatch(toggleAuthPopup());
                setMode('signin');
            });
            return;
        }
        if (mode === 'reset') {
            const token = location.pathname.split('/').pop();
            dispatch(
                resetPassword({
                    token,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                }),
            );
            return;
        }
        if (mode === 'signup') {
            dispatch(register(data));
        } else {
            dispatch(login(data));
        }
        if (authUser) {
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        }
    };
    if (!isAuthPopupOpen || authUser) return null;
    let isLoading = isSigningUp || isLoggingIn || isRequestingForToken;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* OVERLAY */}
                <div className="absolute inset-0 backdrop-blur-md bg-[hsla(var(--glass-bg))]" />

                <div className="relative z-10 glass-panel w-full max-w-md mx-4 animate-fade-in-up">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-primary">
                            {mode === 'reset'
                                ? 'Đặt lại mật khẩu'
                                : mode === 'signup'
                                  ? 'Tạo tài khoản'
                                  : mode === 'forgot'
                                    ? 'Quên mật khẩu?'
                                    : 'Chào mừng bạn đến với TechStore'}
                        </h2>
                        <button
                            onClick={() => {
                                dispatch(toggleAuthPopup());
                            }}
                            className="p-2 rounded-lg glass-card hover:glow-on-hover animate-smooth"
                        >
                            <X className="w-5 h-5 text-primary" />
                        </button>
                    </div>
                    {/* AUTHENTICATION FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* FULL NAME - ONLY FOR SIGNUP */}
                        {mode === 'signup' && (
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        });
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border 
                                    rounded-lg focus:outline-none"
                                    required
                                />
                            </div>
                        )}
                        {/* EMAIL - ALWAYS VISIBLE EXCEPT FOR RESET MODE */}
                        {mode !== 'reset' && (
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        });
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border 
                                    rounded-lg focus:outline-none"
                                    required
                                />
                            </div>
                        )}
                        {/* PASSWORD - ALWAYS VISIBLE EXCEPT FOR FORGOT MODE */}
                        {mode !== 'forgot' && (
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        });
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border 
                                    rounded-lg focus:outline-none"
                                    required
                                />
                                <button
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground 
                                    flex items-center justify-center gap-1"
                                    type="button"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4 text-primary " />
                                    ) : (
                                        <Eye className="w-4 h-4 text-primary" />
                                    )}
                                </button>
                            </div>
                        )}
                        {/* CONFIRM PASSWORD - ONLY VISIBLE FOR RESET MODE */}
                        {mode === 'reset' && (
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value,
                                        });
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border 
                                    rounded-lg focus:outline-none"
                                    required
                                />
                            </div>
                        )}
                        {/* FORGOT PASSWORD TOGGLE BUTTON/LINK */}
                        {mode === 'signin' && (
                            <div className="text-right text-sm">
                                <button
                                    type="button"
                                    onClick={() => setMode('forgot')}
                                    className=" animate-smooth text-primary hover:text-blue-500 underline"
                                >
                                    Quên mật khẩu?
                                </button>
                            </div>
                        )}
                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit "
                            disabled={isLoading}
                            className={`w-full py-3 gradient-primary flex justify-center items-center gap-2 text-white
                          text-primary-foreground rounded-lg font-semibold animate-smooth ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:glow-on-hover'}`}
                        >
                            {isLoading ? (
                                <>
                                    <div
                                        className="w-5 h-5 border-2 border-white border-t-transparent 
                                     rounded-full animate-spin"
                                    />

                                    <span>
                                        {mode === 'reset'
                                            ? 'Đang đặt lại mật khẩu...'
                                            : mode === 'signup'
                                              ? 'Đang đăng ký...'
                                              : mode === 'forgot'
                                                ? 'Đang gửi Email...'
                                                : 'Đang đăng nhập...'}{' '}
                                    </span>
                                </>
                            ) : mode === 'reset' ? (
                                'Đặt lại mật khẩu'
                            ) : mode === 'signup' ? (
                                'Tạo tài khoản'
                            ) : mode === 'forgot' ? (
                                'Gửi Email đặt lại mật khẩu'
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>
                    </form>
                    {/* MODE TOGGLE */}
                    {['signin', 'signup'].includes(mode) && (
                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode((prev) =>
                                        prev === 'signup' ? 'signin' : 'signup',
                                    );
                                }}
                                className="text-primary  "
                            >
                                {mode === 'signup' ? (
                                    <>
                                        {' '}
                                        <span className='cursor-default'>Đã có tài khoản?</span>{' '}
                                        <span className="text-blue-500 underline">
                                            Đăng nhập
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {' '}
                                        <span className='cursor-default'>Chưa có tài khoản?</span>{' '}
                                        <span className="text-blue-500 underline">
                                            Đăng ký
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LoginModal;
