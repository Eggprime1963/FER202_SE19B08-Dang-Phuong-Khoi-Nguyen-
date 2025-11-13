import axios from 'axios';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.get('http://localhost:9999/users');
        const users = response.data;
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Explicit checks: only admin with active status allowed
        if (user.status === 'locked') {
            // Vietnamese message requested in requirements
            throw new Error('Tài khoản bị khóa. Vui lòng liên hệ quản trị viên.');
        }

        if (user.role !== 'admin') {
            throw new Error('Bạn không có quyền truy cập. Chỉ admin được phép vào dashboard.');
        }

        if (user.status !== 'active') {
            throw new Error('Tài khoản không hoạt động.');
        }

        return user;
    } catch (error) {
        throw error;
    }
};