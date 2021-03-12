var httpRequest = new XMLHttpRequest();

class apiDatas {

    productItems = null;
    product = null;

    constructor(self) {
        this.self = self;
        this.countCart();
        this.cartList();
        this.groupCart();


    }

    async allProductItems() {
        if (this.productItems !== null) return this.productItems;
        const data = await fetch(this.self);
        this.productItems = await data.json();
        this.countCart();
        return this.productItems;
    }

    async productItem(productId) {
        let apiUrl = "http://localhost:3000/api/cameras/";
        let apiUrlProduct = apiUrl.concat('', productId)
        let result = null
        const productData = await fetch(apiUrlProduct);
        this.product = await productData.json()

        return this.product;
    }

    setCart(cart) {
        let oldItemsTab = JSON.parse(localStorage.getItem("cart")) || [];

        for (let val in cart) {
            oldItemsTab.push(cart[val]);
        }

        localStorage.setItem('cart', JSON.stringify(oldItemsTab));
        this.countCart();
        this.cartList();
    }

    getCart() {
        return localStorage.getItem("cart") === null ? [] : localStorage.getItem("cart");
    }

    countCart() {
        const cartContent = JSON.parse(this.getCart());
        if (cartContent !== null) {
            document.getElementsByClassName('total-count')[0].innerText = cartContent.length;
        }
    }

    groupCart() {
        const cartContent = JSON.parse(this.getCart());
        let cardDict = {};

        for (let i = 0; i < cartContent.length; i++) {
            // console.log(cartContent[i]);
            if (cardDict[cartContent[i]]) {
                cardDict[cartContent[i]] += 1
            } else {
                cardDict[cartContent[i]] = 1
            }
        }
        return cardDict;
    }

    cartList() {
        let cartContent = this.groupCart();
        let result = {}
        if (cartContent !== null) {
            Object.keys(cartContent).forEach(function(key) {
                // console.log('Key : ' + key + ', Value : ' + cartContent[key]);
                result[key] = cartContent[key]
              })
        }
        // console.log(result);
        return result;
    }

    buildMiniCartListHtml(product, qty = 1) {
        return `
        <li>
            <a href="#" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
            <a class="cart-img" href="#"><img src="${product.imageUrl}" alt="${product.description}"></a>
            <h4><a href="#">${product.name}</a></h4>
            <p class="quantity">1x - <span class="amount">${product.price / 100} €</span></p>
        </li>
        `
    }

}