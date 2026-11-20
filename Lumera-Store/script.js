
// إنشاء سلة التسوق
let cart = [];


// تحديد عناصر الصفحة
const cartButton = document.querySelector('.cart-button');
const cartCount = document.querySelector('#cart-count');
const addButtons = document.querySelectorAll('.add-cart');


// إنشاء نافذة السلة
const cartModal = document.createElement('div');
cartModal.className = 'cart-modal';

cartModal.innerHTML = `
    <div class="cart-content">
        <button class="close-cart">&times;</button>

        <h2>سلة التسوق</h2>

        <div class="cart-items"></div>

        <div class="cart-total">
            المجموع: <span>0</span> ر.س
        </div>

        <button class="clear-cart">إفراغ السلة</button>
        <button class="checkout-button">إتمام الطلب</button>
    </div>
`;

document.body.appendChild(cartModal);


// تحديد عناصر نافذة السلة
const cartItems = cartModal.querySelector('.cart-items');
const cartTotal = cartModal.querySelector('.cart-total span');
const closeCart = cartModal.querySelector('.close-cart');
const clearCart = cartModal.querySelector('.clear-cart');
const checkoutButton = cartModal.querySelector('.checkout-button');


// تحديث عدد المنتجات والمجموع
function updateCart() {

    cartCount.textContent = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    cartItems.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(function(item, index) {

        totalPrice += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        itemElement.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.price} ر.س</p>
            </div>

            <div class="quantity-controls">
                <button class="increase">+</button>
                <span>${item.quantity}</span>
                <button class="decrease">-</button>
                <button class="remove-item">حذف</button>
            </div>
        `;

        const increaseButton = itemElement.querySelector('.increase');
        const decreaseButton = itemElement.querySelector('.decrease');
        const removeButton = itemElement.querySelector('.remove-item');

        increaseButton.addEventListener('click', function() {
            cart[index].quantity++;
            updateCart();
        });

        decreaseButton.addEventListener('click', function() {
            cart[index].quantity--;

            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }

            updateCart();
        });

        removeButton.addEventListener('click', function() {
            cart.splice(index, 1);
            updateCart();
        });

        cartItems.appendChild(itemElement);

    });

    cartTotal.textContent = totalPrice;
}


// إضافة المنتجات إلى السلة
addButtons.forEach(function(button, index) {

    button.addEventListener('click', function() {

        const productCard = button.closest('.product-card');

        const productName = productCard.querySelector('h3').textContent;

        const productPrice = Number(
            productCard.querySelector('.price').textContent.replace('ر.س', '').trim()
        );

        const existingProduct = cart.find(function(item) {
            return item.name === productName;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCart();

        button.textContent = 'تمت الإضافة ✓';

        setTimeout(function() {
            button.textContent = 'أضيفي إلى السلة';
        }, 1200);

    });

});


// فتح السلة
cartButton.addEventListener('click', function(event) {

    event.preventDefault();

    cartModal.classList.add('show');

});


// إغلاق السلة
closeCart.addEventListener('click', function() {

    cartModal.classList.remove('show');

});


// إغلاق السلة عند الضغط خارجها
cartModal.addEventListener('click', function(event) {

    if (event.target === cartModal) {
        cartModal.classList.remove('show');
    }

});


// إفراغ السلة
clearCart.addEventListener('click', function() {

    cart = [];

    updateCart();

});


// إتمام الطلب
checkoutButton.addEventListener('click', function() {

    if (cart.length === 0) {

        alert('سلة التسوق فارغة!');

    } else {

        alert('هذه نسخة تجريبية من المتجر. لا يتم إرسال طلب حقيقي.');

    }

});


// إغلاق السلة باستخدام زر Escape
document.addEventListener('keydown', function(event) {

    if (event.key === 'Escape') {
        cartModal.classList.remove('show');
    }

});
