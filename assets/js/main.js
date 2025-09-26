// ----------------------COMMON--------------------------------
window.onload = kiemtradangnhap();


// Swiper-slider
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

// Close popup 
const body = document.querySelector("body");
let modalContainer = document.querySelectorAll(".modal");
let modalBox = document.querySelectorAll('.mdl-cnt');
let checkBox = document.getElementById("checkbox-signup");

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
function closeSearchAdvanced() {
    document.querySelector(".advanced-search").classList.toggle("open");
}


// Lam moi modal - sigup - login
function resetForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password_confirmation").value = "";
    document.getElementById("checkbox-signup").checked = false;

    document.querySelector(".form-message-name").innerHTML = "";
    document.querySelector(".form-message-phone").innerHTML = "";
    document.querySelector(".form-message-password").innerHTML = "";
    document.querySelector(".form-message-password-confi").innerHTML = "";
    document.querySelector('.form-message-checkbox').innerHTML = '';

    document.getElementById("phone-login").value = "";
    document.getElementById("password-login").value = "";

    document.querySelector(".phonelog").innerHTML = "";
    document.querySelector(".form-message-check-login").innerHTML = "";
}

// Doi sang dinh dang tien VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Auto hide header on scroll
const headerNav = document.querySelector(".header-bottom");
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
    if(lastScrollY < window.scrollY) {
        headerNav.classList.add("hide")
    } else {
        headerNav.classList.remove("hide")
    }
    lastScrollY = window.scrollY;
})


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

// Tìm sản phẩm
var productAll = JSON.parse(localStorage.getItem('products')).filter(item => item.status == 1);
function searchProducts(mode) {
    let valueSearchInput = document.querySelector(".form-search-input").value;
    let valueCategory = document.getElementById("advanced-search-category-select").value;
    let minPrice = document.getElementById("min-price").value;
    let maxPrice = document.getElementById("max-price").value;
    if(parseInt(minPrice) > parseInt(maxPrice) && minPrice != "" && maxPrice != "") {
        alert("Giá đã nhập sai !");
    }

    let result = valueCategory == "Tất cả" ? productAll : productAll.filter(item => {
        return item.category == valueCategory;
    })

    result = valueSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valueSearchInput.toString().toUpperCase())
    })

    if(minPrice == "" && maxPrice != "") {
        result = result.filter((item) => item.price <= maxPrice);
    }else if(minPrice != "" && maxPrice == "") {
        result = result.filter((item) => item.price >= minPrice);
    }else if(minPrice != "" && maxPrice != "") {
        result = result.filter((item) => item.price >= minPrice && item.price <= maxPrice)
    }

    document.getElementById("home-service").scrollIntoView();
    switch (mode){
        case 0:
            result = JSON.parse(localStorage.getItem('products'));
            document.querySelector('.form-search-input').value = "";
            document.getElementById("advanced-search-category-select").value = "Tất cả";
            document.getElementById("min-price").value = "";
            document.getElementById("max-price").value = "";
            break;
        case 1:
            result.sort((a,b) => a.price - b.price)
            break;
        case 2:
            result.sort((a,b) => b.price - a.price)
            break;
    }
    showHomeProduct(result);
}

// Hiện chuyên mục
function showCategory(category) {
    let productSearch = productAll.filter(value => {
        return value.category.toString().toUpperCase().includes(category.toUpperCase());
    })
    let currentPageSeach = 1;
    displayList(productSearch, perPage, currentPageSeach);
    setupPagination(productSearch, perPage, currentPageSeach);
}

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
        document.querySelector('.form-message-password').innerHTML = "";
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
       document.querySelector('.form-message-checkbox').innerHTML = 'Vui lòng check đăng ký';
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
                kiemTraDangNhap();
            }
    
    }
})

// Chức năng đăng nhập
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    let phonelog = document.getElementById("phone-login").value;
    let passlog = document.getElementById("password-login").value;
    let accounts = JSON.parse(localStorage.getItem("accounts"));

    if (phonelog.length == 0) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phonelog.length != 10) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone-login').value = '';
    } else {
        document.querySelector('.form-message.phonelog').innerHTML = '';
    }

    if (passlog.length == 0) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passlog.length < 6) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('passwordlogin').value = '';
    } else {
        document.querySelector('.form-message-check-login').innerHTML = '';
    }

    if(phonelog && passlog) {
        let index = accounts.findIndex(item => item.phone == phonelog);
        if(index == -1) {
            alert("Số điện thoại chưa đăng ký!");
        }else {
            localStorage.setItem("currentuser", JSON.stringify(accounts[index]));
            closeModal();
            kiemTraDangNhap();
        }
    }
})

// Open & Close Cart
function openCart() {
    document.querySelector('.modal-cart').classList.add('open');
    body.style.overflow = "hidden";
}

function closeCart() {
    document.querySelector('.modal-cart').classList.remove('open');
    body.style.overflow = "auto";
}

// ----------------------BODY--------------------------------
// Biểu diễn sản phẩm
function renderProducts(showProduct) {
    let productHtml = "";
    if(showProduct.length == 0) {
        document.getElementById("home-title").style.display = "none";
        document.getElementById("no-result").style.display = "block";
    }else {
        document.getElementById("home-title").style.display = "block";
        document.getElementById("no-result").style.display = "none";
        showProduct.forEach((product) => {
            const card = 
            `<div class="col-product">   
                <article class="card-product" >
                    <div class="card-header">
                        <a href="#" class="card-image-link"">
                        <img class="card-image" src="${product.img}" alt="${product.title}">
                        </a>
                    </div>
                    <div class="food-info">
                        <div class="card-content">
                            <div class="card-title">
                                ${product.title}
                            </div>
                            <div class="card-desc2">
                                ${product.desc2}
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="product-price">
                                <span class="price">${vnd(product.price)}</span>
                            </div>
                            <div class="product-buy">
                                <button class="card-button order-item"><i class="fa-regular fa-cart-shopping-fast"></i> Đặt món</button>
                            </div> 
                        </div>
                    </div>
                </article>
            </div>`;
            productHtml += card;
        })
    }
    document.getElementById("home-products").innerHTML = productHtml;
}

// Phân trang
let perPage = 8;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];
function displayList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    renderProducts(productShow);
}

function showHomeProduct(products) {
    let productAll = products.filter(item => item.status == 1);
    displayList(productAll, perPage, currentPage);
    setupPagination(productAll, perPage, currentPage);
}
window.onload = showHomeProduct(JSON.parse(localStorage.getItem('products')))

function setupPagination(productAll, perPage) {
    document.querySelector(".page-nav-list").innerHTML = "";
    let page_count = Math.ceil(productAll.length / perPage);
    for(let i = 1; i <= page_count; ++i) {
        let li = paginationChange(i, productAll, currentPage);
        document.querySelector(".page-nav-list").appendChild(li);
    }
}

function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="javascript:;">${page}</a>`;
    if (currentPage == page) {
        node.classList.add("active");
    }
    node.addEventListener("click", function(){
        currentPage = page;
        displayList(productAll, perPage, currentPage);
        let removeActive = document.querySelectorAll(".page-nav-item.active");
        for(let i = 0; i <removeActive.length; ++i) {
            removeActive[i].classList.remove("active");
        }
        node.classList.add("active");
        document.getElementById("home-service").scrollIntoView();
    })
    return node;
}

// Kiểm tra xem có tài khoản đăng nhập không
function kiemTraDangNhap() {
    let currentUser = localStorage.getItem("currentuser");
    if(currentUser != null) {
        let user = JSON.parse(currentUser);
         document.querySelector('.auth-container').innerHTML = 
         `
         <span class="text-dndk">Tài khoản</span>
         <span class="text-tk">${user.fullname} <i class="fa-sharp fa-solid fa-caret-down"></i></span>
         `
         document.querySelector('.header-middle-right-menu').innerHTML =
         `
        <li><a href="javascript:;" onclick="myAccount()"><i class="fa-light fa-circle-user"></i> Tài khoản của tôi</a></li>
        <li><a href="javascript:;" onclick="orderHistory()"><i class="fa-regular fa-bags-shopping"></i> Đơn hàng đã mua</a></li>
        <li class="border"><a id="logout" href="javascript:;"><i class="fa-light fa-right-from-bracket"></i> Thoát tài khoản</a></li>
         `
         document.getElementById("logout").addEventListener("click", logOut);
    }
}

function logOut() {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    user = JSON.parse(localStorage.getItem("currentuser"));
    let index = accounts.findIndex(item => item.phone == user.phone);
    accounts[index].cart.length = 0;
    for(let i = 0; i< user.cart.length; ++i) {
        accounts[index].cart[i] = user.cart[i];
    }
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.removeItem('currentuser');
    window.location.href = "index.html"
}