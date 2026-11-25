const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {

button.addEventListener("click", function() {

    const product = this.dataset.name;
    const price = Number(this.dataset.price);

    const card = this.closest(".product-card"); // было ".product"
    const size = card.querySelector(".size").value;

    if (!size) {
        alert("Пожалуйста, выберите размер!");
        return;
    }

    let cart = JSON.parse(
        localStorage.getItem("nle-cart")
    ) || []; // добавлен || []

    cart.push({
        name: product,
        price: price,
        size: size
    });

    localStorage.setItem(
        "nle-cart",
        JSON.stringify(cart)
    );

    alert("Товар добавлен в корзину!");
});
});

const cartItems = document.getElementById("cart-items");

if (cartItems) {

let cart = JSON.parse(
    localStorage.getItem("nle-cart")
) || []; // и здесь тоже

function showCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Ваша корзина пока пуста.</p>";
    }

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-product">
                <h3>${item.name}</h3>
                <p>Размер: ${item.size}</p>
                <p>${item.price.toLocaleString("ru-RU")} ₽</p>
                <button onclick="removeItem(${index})">
                    Удалить
                </button>
            </div>
        `;
    });

    document.getElementById("total").textContent =
        "Итого: " + total.toLocaleString("ru-RU") + " ₽";
}

window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("nle-cart", JSON.stringify(cart));
    showCart();
};

document.getElementById("clear-cart").addEventListener("click", function() {
    cart = [];
    localStorage.setItem("nle-cart", JSON.stringify(cart));
    showCart();
});

showCart();
}

document.addEventListener('DOMContentLoaded', function() {
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('userName').value;
    const rating = document.getElementById('userRating').value;
    const text = document.getElementById('reviewText').value;

    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '⭐️';
    }

    const now = new Date();
    const date = now.toLocaleDateString('ru-RU');

    const newReview = document.createElement('div');
    newReview.classList.add('review-card');

    newReview.innerHTML = `
        <div class="review-header">
            <span class="review-author">${name}</span>
            <span class="review-stars">${stars}</span>
        </div>
        <p class="review-date">${date}</p>
        <p class="review-text">${text}</p>
    `;

    reviewsList.prepend(newReview);
    reviewForm.reset();
    alert('Спасибо! Ваш отзыв опубликован.');
});
});