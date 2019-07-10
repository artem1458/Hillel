var login = prompt('Введите логин'),
    password = prompt('Введите пароль');

var loginReg = /^[A-Z]{1}[A-Za-z\d]*\d{2}$/,
    passwordReg = /^[A-ZА-Я]{0,5}$/;

console.log(loginReg.test(login));
console.log(passwordReg.test(password));
