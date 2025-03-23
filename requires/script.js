import users from "./users.js";
import posts from "./posts.js";

let currentUser = null;

function showContent(page) {
    const content = document.getElementById("content");

    switch (page) {
        case 'login':
            content.innerHTML = `
                <div class="login-container">
                    <h2>Đăng nhập</h2>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" id="email" placeholder="Nhập email">
                    </div>
                    <div class="form-group">
                        <label>Mật khẩu:</label>
                        <input type="password" id="password" placeholder="Nhập mật khẩu">
                    </div>
                    <button onclick="login()">Đăng nhập</button>
                    <div id="message" class="message"></div>
                </div>`;
            break;

        case 'register':
            content.innerHTML = `
                <div class="login-container">
                    <h2>Đăng ký</h2>
                    <div class="form-group">
                        <label>Họ:</label>
                        <input type="text" id="first_name" placeholder="Nhập họ">
                    </div>
                    <div class="form-group">
                        <label>Tên:</label>
                        <input type="text" id="last_name" placeholder="Nhập tên">
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" id="reg_email" placeholder="Nhập email">
                    </div>
                    <div class="form-group">
                        <label>Mật khẩu:</label>
                        <input type="password" id="reg_password" placeholder="Nhập mật khẩu">
                    </div>
                    <button onclick="register()">Đăng ký</button>
                    <div id="reg_message" class="message"></div>
                </div>`;
            break;

        case 'userList':
            let userTable = `
                <h2>Danh sách Users</h2>
                <table border="1">
                    <tr>
                        <th>ID</th>
                        <th>Họ</th>
                        <th>Tên</th>
                        <th>Email</th>
                    </tr>`;
            users.forEach(user => {
                userTable += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                    </tr>`;
            });
            userTable += `</table>`;
            content.innerHTML = userTable;
            break;
    
        case 'postList':
            let postTable = `
                <h2>Danh sách Posts</h2>
                <table border="1">
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Ảnh</th>
                        <th>Người tạo</th>
                        <th>Ngày tạo</th>
                        <th>Ngày sửa đổi</th>
                    </tr>`;
            posts.forEach(post => {
                const user = users.find(u => u.id === post.user_id);
                postTable += `
                    <tr>
                        <td>${post.id}</td>
                        <td>${post.title}</td>
                        <td>${post.content}</td>
                        <td><img src="${post.image}" width="100"></td>
                        <td>${user.first_name} ${user.last_name}</td>
                        <td>${post.created_at}</td>
                        <td>${post.updated_at}</td>
                    </tr>`;
            });
            postTable += `</table>`;
            content.innerHTML = postTable;
            break;

        case 'postDetail':
            content.innerHTML = `
                <h2>Chi tiết Post</h2>
                <div class="form-group">
                    <label>Nhập ID bài viết:</label>
                    <input type="number" id="post_id" placeholder="Nhập ID">
                </div>
                <button onclick="viewPostDetail()">Xem chi tiết</button>
                <div id="post_detail"></div>`;
            break;

        case 'searchPost':
            content.innerHTML = `
                <h2>Tìm kiếm Posts theo User</h2>
                <div class="form-group">
                    <label>Nhập email người dùng:</label>
                    <input type="email" id="search_email" placeholder="Nhập email">
                </div>
                <button onclick="searchPostsByUser()">Tìm kiếm</button>
                <div id="search_results"></div>`;
            break;

        default:
            content.innerHTML = `<h2>Chọn chức năng từ menu</h2>`;
    }
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("message");

    if (!email || !password) {
        messageDiv.innerText = "Hãy nhập đầy đủ thông tin!";
        messageDiv.style.color = "red";
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        messageDiv.innerText = `Đăng nhập thành công! Chào ${user.first_name} ${user.last_name}`;
        messageDiv.style.color = "green";
        currentUser = user;
    } else {
        messageDiv.innerText = "Thông tin đăng nhập không chính xác!";
        messageDiv.style.color = "red";
    }
}

function register() {
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("reg_email").value;
    const password = document.getElementById("reg_password").value;
    const messageDiv = document.getElementById("reg_message");

    if (!firstName || !lastName || !email || !password) {
        messageDiv.innerText = "Hãy nhập đầy đủ thông tin!";
        messageDiv.style.color = "red";
        return;
    }

    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        messageDiv.innerText = "Email này đã được đăng ký!";
        messageDiv.style.color = "red";
    } else {
        const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({ id: newId, first_name: firstName, last_name: lastName, email, password });
        messageDiv.innerText = "Đăng ký thành công!";
        messageDiv.style.color = "green";
    }
}

    function viewPostDetail() {
    const postId = document.getElementById("post_id").value;
    const post = posts.find(p => p.id == postId);
    const detailDiv = document.getElementById("post_detail");

        if (post) {
            const user = users.find(u => u.id === post.user_id);
            detailDiv.innerHTML = `
                <table border="1">
                    <tr><th>ID</th><td>${post.id}</td></tr>
                    <tr><th>Tiêu đề</th><td>${post.title}</td></tr>
                    <tr><th>Nội dung</th><td>${post.content}</td></tr>
                    <tr><th>Ảnh</th><td><img src="${post.image}" width="100"></td></tr>
                    <tr><th>Người tạo</th><td>${user.first_name} ${user.last_name}</td></tr>
                    <tr><th>Ngày tạo</th><td>${post.created_at}</td></tr>
                    <tr><th>Ngày sửa đổi</th><td>${post.updated_at}</td></tr>
                </table>`;
        } else {
            detailDiv.innerHTML = "Không tìm thấy bài viết!";
        }
    }

    function searchPostsByUser() {
    const email = document.getElementById("search_email").value;
    const user = users.find(u => u.email === email);
    const resultsDiv = document.getElementById("search_results");

    if (!user) {
        resultsDiv.innerText = "Không tìm thấy người dùng!";
        return;
    }

    const userPosts = posts.filter(p => p.user_id === user.id);
    if (userPosts.length === 0) {
        resultsDiv.innerText = "User này chưa có bài viết nào.";
        return;
    }

    let resultTable = `
        <h2>Bài viết của ${user.first_name} ${user.last_name}</h2>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Ảnh</th>
                <th>Ngày tạo</th>
                <th>Ngày sửa đổi</th>
            </tr>`;
    userPosts.forEach(post => {
        resultTable += `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.content}</td>
                <td><img src="${post.image}" width="100"></td>
                <td>${post.created_at}</td>
                <td>${post.updated_at}</td>
            </tr>`;
    });
        resultTable += `</table>`;
        resultsDiv.innerHTML = resultTable;
}

window.login = login;
window.register = register;
window.showContent = showContent;
window.viewPostDetail = viewPostDetail;
window.searchPostsByUser = searchPostsByUser;
