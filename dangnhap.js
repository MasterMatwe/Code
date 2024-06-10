document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const username = usernameInput.value;
  const password = passwordInput.value;
  fetch('users.json')
    .then(response => response.json())
    .then(customersData => {
       const user = customersData.find(u => u.username === username);
         if (user && user.password === password) {
            alert("Chào mừng " + username + "!");
            window.location.href = "http:///google.com";
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    })
      .catch(error => {
        console.error('Lỗi khi đăng nhập:', error);
        alert("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
  })
 });