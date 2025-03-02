import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { AppstoreOutlined, MedicineBoxOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLayout.scss";
import { IsLoginSuccessFully } from "../../../validations/IsLogginSuccessfully.ts";
import logo from "../../../assets/navbar/Logo_Navbar.png";
import { GoPackage } from "react-icons/go";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";

const { Header, Sider, Content } = Layout;


interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [selectedMenu, setSelectedMenu] = useState<string>("combo");

    const { username, role } = IsLoginSuccessFully();

    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.clear();
        navigate("/homepage");
    };


    const menuItems = [
        {
            key: 'admin-dashboard',
            icon: <AppstoreOutlined />,
            label: <Link to="/admin/dashboard">Trang Dashboard</Link>
        },
        {
            key: 'account',
            icon: <GoPackage />,
            label: <Link to="/admin/account">Quản lý Account</Link>
        },
        {
            key: 'blog',
            icon: <MedicineBoxOutlined />,
            label: <Link to="/admin/blog">Quản lý Blog</Link>
        },
        {
            key: 'vaccine-schedule',
            icon: <MdOutlineCalendarToday/>,
            label: <Link to="/admin/schedule-vaccines">Quản lý Lịch Tiêm Cho Vaccine</Link>
        },
        {
            key: 'feedback',
            icon: <MdOutlineInventory2 />,
            label: <Link to="/admin/feedback">Quản lý Feedback</Link>,
        }
    ];

    return (
        <Layout className="admin-layout">
            <Header className="admin-header">
                <Link to="/admin/dashboard" className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>

                <div className="header-right">
                    <UserOutlined className="user-icon" />
                    <span className="user-info">Xin chào {role} {username}</span>

                    <Button
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Đăng xuất
                    </Button>
                </div>
            </Header>

            <Layout>
                <Sider width={300} theme="light" className="sider">
                    <Menu
                        theme="light"
                        mode="inline"
                        selectedKeys={[selectedMenu]}
                        onClick={({ key }) => setSelectedMenu(key)}
                        items={menuItems}
                    />
                </Sider>

                <Layout className="content-layout">
                    <Content className="content">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;