const readline = require("readline");
const users = require("./users");
const posts = require("./posts");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function login() {
    const email = await prompt("Nhập email: ");
    const password = await prompt("Nhập password: ");
    if (!email || !password) {
        console.log("Hãy nhập đầy đủ thông tin");
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        console.log(`Xin chào ${user.first_name} ${user.last_name}`);
    } else {
        console.log("Thông tin tài khoản không chính xác");
    }
}

async function register() {
    const first_name = await prompt("Nhập họ: ");
    const last_name = await prompt("Nhập tên: ");
    const email = await prompt("Nhập email: ");
    const password = await prompt("Nhập password: ");
    if (!first_name || !last_name || !email || !password) {
        console.log("Hãy nhập đầy đủ thông tin");
        return;
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        console.log("Email này đã có tài khoản");
    } else {
        const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({ id: newId, first_name, last_name, email, password });
        console.log("Đăng ký thành công!");
    }
}

async function listUsers() {
    const keyword = await prompt("Nhập từ khóa tìm kiếm: ");
    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.includes(keyword) || user.email.includes(keyword)
    );
    console.log("Danh sách users:");
    filteredUsers.forEach(user => {
        console.log(`ID: ${user.id}, Họ và tên: ${user.first_name} ${user.last_name}, Email: ${user.email}`);
    });
}

function listPosts() {
    console.log("Danh sách posts:");
    posts.forEach(post => {
        const user = users.find(u => u.id === post.user_id);
        const fullName = `${user.first_name} ${user.last_name}`;
        console.log(`ID: ${post.id}, Title: ${post.title}, Ngày tạo: ${post.created_at}, Người tạo: ${fullName}`);
    });
}

async function viewPostDetail() {
    const postId = await prompt("Nhập ID của post: ");
    const post = posts.find(p => p.id === parseInt(postId));
    if (post) {
        const user = users.find(u => u.id === post.user_id);
        console.log(`ID: ${post.id}`);
        console.log(`Tiêu đề: ${post.title}`);
        console.log(`Nội dung: ${post.content}`);
        console.log(`Link ảnh: ${post.image}`);
        console.log(`Người tạo: ${user.first_name} ${user.last_name}`);
        console.log(`Ngày tạo: ${post.created_at}`);
        console.log(`Ngày sửa đổi: ${post.updated_at}`);
    } else {
        console.log("Không tìm thấy post với ID đã nhập.");
    }
}

async function searchPostsByUser() {
    const email = await prompt("Nhập email của user: ");
    const user = users.find(u => u.email === email);
    if (!user) {
        console.log("Không tìm thấy user với email đã nhập.");
        return;
    }

    const userPosts = posts.filter(p => p.user_id === user.id);
    if (userPosts.length === 0) {
        console.log("User này chưa có bài viết nào.");
        return;
    }

    console.log(`Các bài viết của ${user.first_name} ${user.last_name}:`);
    userPosts.forEach(post => {
        console.log(`ID: ${post.id}, Title: ${post.title}, Ngày tạo: ${post.created_at}`);
    });
}

async function main() {
    while (true) {
        console.log("\n=== HỆ THỐNG QUẢN LÝ ===");
        console.log("1. Đăng nhập");
        console.log("2. Đăng ký");
        console.log("3. Xem danh sách users");
        console.log("4. Xem danh sách posts");
        console.log("5. Xem chi tiết post");
        console.log("6. Tìm kiếm posts theo user");
        console.log("0. Thoát");
        
        const choice = await prompt("Chọn chức năng: ");
        switch (choice) {
            case "1": await login(); break;
            case "2": await register(); break;
            case "3": await listUsers(); break;
            case "4": listPosts(); break;
            case "5": await viewPostDetail(); break;
            case "6": await searchPostsByUser(); break;
            case "0": rl.close(); return;
            default: console.log("Lựa chọn không hợp lệ!"); break;
        }
    }
}

main();
