import axios from "axios";

import React, { useState } from "react";
import { apiForgotPassword, apiLogIn, apiRegister } from "../apis/apiAuth";
import { ForgotPasswordRequest, LoginRequest, RegisterRequest } from "../types/Auth";
import { notification } from "antd";  
import { useNavigate} from "react-router-dom";  



export const useLogin = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();  
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () =>{
        setShowPassword((prev)=> !prev)
    }

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); 
        const data : LoginRequest = {username, password};

        
        if (!username || !password) {
            setError("Tài khoản và mật khẩu không được để trống");
            notification.error({
                message:"Đăng Nhập Thất Bại"
            })
            return;
        }


        setIsLoading(true);

        try {
            const response = await apiLogIn(data);

            if (response.token) {

                localStorage.setItem("token", response.token);
                console.log("Login Successful", response);

                notification.success({
                    message: "Đăng Nhập Thành Công",  
                });

                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/homepage");  
                }, 2000);
            }else{
                notification.error({
                    message: "Đăng nhập thất bại", 
                    description:"Tài Khoản Hoặc mật Khẩu bị sai" 
                });
            }
        } catch (error) {
            console.log(error);
            notification.error({
                message: "Đăng nhập thất bại, Tài Khoản Hoặc mật Khẩu bị sai",  
            });
            setError("Đăng nhập thất bại, Tài Khoản Hoặc mật Khẩu bị sai");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        handleLoginSubmit,
        showPassword,
        isLoading,
        togglePasswordVisibility,
        error,
    };
};

export const useRegister = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [doB, setDob] = useState<string>("");

    
    const [errorUsername, setErrorUsername] = useState<string | null>(null);
    const [errorEmail, setErrorEmail] = useState<string | null>(null);
    const [errorPassword, setErrorPassword] = useState<string | null>(null);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string | null>(null);
    const [errorPhoneNumber, setErrorPhoneNumber] = useState<string | null>(null);
    const [errorAddress, setErrorAddress] = useState<string | null>(null);
    const [errorDoB, setErrorDoB] = useState<string | null>(null);
    const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () =>{
        setShowPassword((prev)=> !prev)
    }

    const handleUsernameChange = (value: string) => {
        setUsername(value);
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            setErrorUsername("Tên đăng nhập chỉ chứa chữ và số, không có dấu cách.");
        } else {
            setErrorUsername(null);
        }
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (!/\S+@\S+\.\S+/.test(value)) {
            setErrorEmail("Email không đúng định dạng");
        } else {
            setErrorEmail(null);
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (!/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
            setErrorPassword("Mật khẩu cần ít nhất 1 chữ hoa, 1 ký tự đặc biệt, tối thiểu 6 ký tự.");
        } else {
            setErrorPassword(null);
        }

        if (confirmPassword && value !== confirmPassword) {
            setErrorConfirmPassword("Mật khẩu xác nhận không khớp");
        } else {
            setErrorConfirmPassword(null);
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (password && value !== password) {
            setErrorConfirmPassword("Mật khẩu xác nhận không khớp");
        } else {
            setErrorConfirmPassword(null);
        }
    };

    const handlePhoneNumberChange = (value: string) => {
        setPhoneNumber(value);
        if (!/^\d{10,11}$/.test(value)) {
            setErrorPhoneNumber("Số điện thoại không hợp lệ.");
        } else {
            setErrorPhoneNumber(null);
        }
    };

    const handleAddressChange = (value: string) => {
        setAddress(value);
        if (value.length < 5) {
            setErrorAddress("Địa chỉ phải có ít nhất 5 ký tự.");
        } else {
            setErrorAddress(null);
        }
    };

    const handleDoBChange = (value: string) => {
        setDob(value);
        if (!value) {
            setErrorDoB("Không Được Để Trống Ngày Sinh");
        } else {
            setErrorDoB(null);
        }
    };

    
    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorGeneral(null);

        handleUsernameChange(username);
        handleEmailChange(email);
        handlePasswordChange(password);
        handleConfirmPasswordChange(confirmPassword);
        handlePhoneNumberChange(phoneNumber);
        handleAddressChange(address);
        handleDoBChange(doB);
        
        const data : RegisterRequest = {email, confirmPassword, username, fullName, phoneNumber, address, doB}
        
        if (errorUsername || errorEmail || errorPassword || errorConfirmPassword || errorPhoneNumber || errorAddress || errorDoB) {
            notification.error({
                message: "Đăng Kí Thất Bại",
            });
        }


        setIsLoading(true);
        try {
            const response = await apiRegister(data);
            if (response.status === 200) {
                notification.success({
                    message: "Đăng Kí Thành Công",
                    description: "Bạn sẽ được chuyển đến trang Login trong ít giây.",
                });
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }else{
                notification.error({
                    message:"Đăng Kí Thất Bại",
                })
            }
        } catch (error) {
            console.error(error);
            notification.error({
                message:"Đăng Kí Thất Bại",
                description:"Lỗi Server"
            })
        } finally {
            setIsLoading(false);
        }
    };

    return {
        showPassword,
        togglePasswordVisibility,
        username,
        handleUsernameChange,
        email,
        handleEmailChange,
        password,
        handlePasswordChange,
        confirmPassword,
        handleConfirmPasswordChange,
        fullName,
        setFullName,
        phoneNumber,
        handlePhoneNumberChange,
        address,
        handleAddressChange,
        doB,
        handleDoBChange,
        isLoading,
        handleRegisterSubmit,
        errorUsername,
        errorEmail,
        errorPassword,
        errorConfirmPassword,
        errorPhoneNumber,
        errorAddress,
        errorDoB,
        errorGeneral,
    };
};

export const useLoginGoogle = () => {

    const handleGoogleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    return {handleGoogleLogin}


}


export const useForgotPassWord  = () => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

   

    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: ForgotPasswordRequest = { email };

        if (!email.trim()) {
            setError("Vui lòng nhập email.");
            return;
        }

        setLoading(true);
        setError(null); 

        try {
            const response = await apiForgotPassword(data);
            if (response.status === 200) { 
                navigate('/verify-otp');
            } else {
                setError(response.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 404) {
                    setError("Email không tồn tại.");
                } else {
                    setError(err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
                }
            } else {
                setError("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, loading, error, handleForgotPasswordSubmit };
}