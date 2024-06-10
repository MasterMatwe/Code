document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.getElementById('registrationForm');

  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const fullname = registrationForm.querySelector('input[name="fullname"]').value;
    const email = registrationForm.querySelector('input[name="email"]').value;
    const username = registrationForm.querySelector('input[name="username"]').value;
    const password = registrationForm.querySelector('input[name="password"]').value;
    const confirmPassword = registrationForm.querySelector('input[name="confirm_password"]').value;

    // Kiểm tra mật khẩu trùng khớp
    if (password !== confirmPassword) {
      alert("Mật khẩu không trùng khớp. Vui lòng nhập lại.");
      return;
    }

    const newUser = {
      fullname: fullname,
      email: email,
      username: username,
      password: password // Lưu ý: Trong ứng dụng thực tế, nên mã hóa mật khẩu
    };

    fetch('http://localhost:3000/register', { // Sử dụng URL của API backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      // Kiểm tra nếu response không phải là JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error("Đăng ký thành công!");
      }
      return response.json();
    })
    .then(data => {
      alert("Đăng ký thành công!");
      alert("Đang chuyển hướng đến trang đăng nhập");
      window.location.href = 'dangnhap.html';
    })
    .catch(error => {
      console.error('Lỗi khi đăng ký:', error);
      if (error.message !== "Đăng ký thành công!") {
        alert("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
      } else {
        alert(error.message);
        alert("Đang chuyển hướng đến trang đăng nhập");
        window.location.href = 'dangnhap.html';
      }
    });
  });
});
