// ----------------------COMMON--------------------------------
// Close popup 
const body = document.querySelector("body");
let modalContainer = document.querySelectorAll(".modal");
let modalBox = document.querySelectorAll('.mdl-cnt');

function closeModal() {
    modalContainer.forEach(item => {
        item.classList.remove('open');
    });
    console.log(modalContainer)
    body.style.overflow = "auto";
}
// Click vùng ngoài sẽ tắt Popup
modalContainer.forEach(item => {
    resetForm();
    item.addEventListener('click', closeModal);
});
modalBox.forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation();
    })
});

// Lam moi modal - sigup - login
function resetForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password_confirmation").value = "";
    document.getElementById("checkbox-signup").checked = false;
}

// ----------------------HEADER--------------------------------
// Advanced-Search
document.querySelector(".filter-btn").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".advanced-search").classList.toggle("open")
    document.getElementById("home-service").scrollIntoView();
})
document.querySelector(".form-search-input").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("home-service").scrollIntoView();
})
// Login - Signup
let loginbtn = document.getElementById("login");
let signupbtn = document.getElementById("signup");
let form_login_signup = document.querySelector(".modal.signup-login");
let container = document.querySelector('.modal-container');

loginbtn.addEventListener("click", () => {
    resetForm();
    form_login_signup.classList.add('open');
    container.classList.add('active');
    body.style.overflow = "hidden";
})

signupbtn.addEventListener('click', () => {
    resetForm();
    form_login_signup.classList.add('open');
    container.classList.remove('active');
    body.style.overflow = "hidden";
})

// Chuyen doi qua lai SignUp & Login 
let signup = document.querySelector(".signup-link");
let login = document.querySelector(".login-link");

login.addEventListener("click", () => {
    resetForm();
    container.classList.add("active");
})
signup.addEventListener("click", () => {
    resetForm();
    container.classList.remove("active");
})

// Chức năng đăng ký
let signupButton = document.getElementById("signup-button");
let loginButton = document.getElementById("login-button")
signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    let fullNameUser = document.getElementById("fullname").value;
    let phoneUser = document.getElementById("phone").value;
    let passwordUser = document.getElementById("password").value;
    let password_confirmation = document.getElementById("password_confirmation").value;
    let checkbox = document.getElementById("checkbox-signup").checked;

    if(fullNameUser.length == 0) {
        document.querySelector(".form-message-name").innerHTML = "Vui lòng nhập họ vâ tên"
        document.getElementById("fullname").focus();
    } else {
        document.querySelector('.form-message-name').innerHTML = "";
    }

    if (phoneUser.length == 0) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phoneUser.length != 10) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone').value = '';
    } else {
        document.querySelector('.form-message-phone').innerHTML = '';
    }

    if (passwordUser.length == 0) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('password').value = '';
    } else {
        document.querySelector('.form-message-password').innerHTML = "Mật khẩu không khớp";
    } 

    if(password_confirmation.length == 0) {
        document.querySelector(".form-message-password-confi").innerHTML = "Vui lòng nhập lại mật khẩu";
    } else if(password_confirmation != passwordUser) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Mật khẩu không khớp';
        document.getElementById(".password_confirmation").value = "";
    } else {
        document.querySelector("form-message-password-confi").innerHTML = "";
    }

    if(checkbox != true) {
        document.querySelector(".form-message-checkbox").innerHTML = "Vui lòng check đăng ký";
    } else {
        document.querySelector('.form-message-checkbox').innerHTML = '';
    }

    if(fullNameUser && phoneUser && passwordUser && password_confirmation && checkbox) {
        let user = {
            fullname: fullNameUser,
            phone: phoneUser,
            password: passwordUser,
            address: '',
            email: '',
            status: 1,
            join: new Date(),
            cart: [],
            userType: 0
        }

        let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
        let checkloop = accounts.some(account => {
            return account.phone == user.phone;
        })

        if(!checkloop) {
            accounts.push(user);
            localStorage.setItem("accounts", JSON.stringify(accounts));
            localStorage.setItem("currentuser", JSON.stringify(user));
            closeModal();
        }
    }
})

const swiper = new Swiper('.home-slider', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// Hàm render sản phẩm
function renderProducts(showProduct) {
    let productHtml ='';
    if(showProduct.length == 0) {
        document.getElementById("home-title").style.display = "none";

    }else {
        document.getElementById("home-title").style.display = "block";
    }
}

// Gọi khi load trang
document.addEventListener("DOMContentLoaded", function() {
    // tạo sẵn sản phẩm nếu chưa có
    if (!localStorage.getItem("products")) {
        createProduct(); 
    }

    let products = JSON.parse(localStorage.getItem("products"));
    renderProducts(products);
});


