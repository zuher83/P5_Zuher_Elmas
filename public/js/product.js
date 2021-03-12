class product {

  constructor(pageProduct, idProduct) {
    this.getProductItem(pageProduct, idProduct);
    // localStorage.clear();
  }

  async getProductItem(pageProduct, idProduct) {
    let content = "";
    try {
      const product = await orinocoApi.apiDatas.productItem(idProduct);
      content += this.buildHtmlProduct(product);
    } catch (err) {
      console.error(err);
    }


    pageProduct.innerHTML = content;
    this.quantityUpdate();
    this.addInMyCartClick();
  }

  quantityUpdate() {
    document.getElementById("minus").addEventListener("click", this.minusQuantity);
    document.getElementById("plus").addEventListener("click", this.plusQuantity);
  }

  minusQuantity() {
    let getValue = parseInt(document.getElementById("quantity").value);
    if (getValue > 1) {
      let newValue = getValue -= 1
      document.getElementById("quantity").value = newValue
    }
  }

  plusQuantity() {
    let getValue = parseInt(document.getElementById("quantity").value);
    let newValue = getValue += 1
    document.getElementById("quantity").value = newValue
  }

  buildHtmlProduct(product) {
    return `
    <div class="col-12 col-lg-6">
      <div class="card bg-light mb-3">
          <div class="card-body">
              <a href="" data-toggle="modal" data-target="#productModal">
              <img src="${product.imageUrl}" class="img-fluid" alt="${product.description}">
                  <p class="text-center">Zoom</p>
              </a>
          </div>
      </div>
    </div>


      <div class="col-12 col-lg-6">
        <div class="card" data-id="${product._id}">
            <div class="card-body">
                <h2 class="card-title">${product.name} </h2>
                <div class="card-text">${product.description} </div>
                <div class="row">
                  <div class="col col-lg-6">
                    <div class="form-group">
                    <label>Quantity :</label>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <button type="button" class="quantity-left-minus btn btn-danger btn-number" id="minus" data-field="">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control"  id="quantity" name="quantity" min="1" max="100" value="1">
                        <div class="input-group-append">
                            <button type="button" class="quantity-right-plus btn btn-success btn-number" id="plus" data-field="">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row pt-3">
                    <div class="col">
                        <div class="prix font-weight-bold label label-danger">${product.price / 100} €</div>
                    </div>
                    <div class="col">
                        <button id="add-in-cart" class="btn btn-sm btn-success"><i class="fas fa-cart-plus"></i> Add</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    `;
  }


  addInMyCartClick() {
    document.getElementById("add-in-cart").addEventListener("click", this.addInMyCart);
  }

  addInMyCart() {

    var searchParams = new URLSearchParams(document.location.search.substring(1));
    let params = searchParams.get('id');
    let quantity = parseInt(document.getElementById("quantity").value);

    orinocoApi.cart.add(params, quantity);
  }

}