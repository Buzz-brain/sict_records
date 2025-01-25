document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    alert(`Role: ${role}\nEmail: ${email}\nPassword: ${password}`);
  });
  