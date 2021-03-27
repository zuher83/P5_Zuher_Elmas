class product {

  constructor(pageProduct, idProduct) {
    this.getProductItem(pageProduct, idProduct);
  }

  /**
   * Affiche le produit avec les spécifications et construit le html
   *
   * @param   {HTMLElement}   pageProduct
   * @param   {String}        idProduct   Id du produit
   * @memberof product
   */
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

  /**
   * Ajoute une écoute sur le boutton plus et moins lorsqu'on modifie la quantité
   *
   * @memberof product
   */
  quantityUpdate() {
    document.getElementById("minus").addEventListener("click", this.minusQuantity);
    document.getElementById("plus").addEventListener("click", this.plusQuantity);
  }

  /**
   * Décrémente la quantité de produit maximum jusqu'à 1
   *
   * @memberof product
   */
  minusQuantity() {
    let getValue = parseInt(document.getElementById("quantity").value);
    if (getValue > 1) {
      let newValue = getValue -= 1;
      document.getElementById("quantity").value = newValue;
    }
  }

  /**
   * Incrémente la quantité de produit par 1
   *
   * @memberof product
   */
  plusQuantity() {
    let getValue = parseInt(document.getElementById("quantity").value);
    let newValue = getValue += 1;
    document.getElementById("quantity").value = newValue;
  }

  /**
   * Construit un champ select affichant les options du produit
   *
   * @param {String} lenses
   * @return {HTMLElement}
   * @memberof product
   */
  getLensesOptions(lenses) {
    let result = '';
    for (let i = 0, size = lenses.length; i < size; i++) {
      result += ` <option>${lenses[i]}</option>`;
    }
    return result;
  }

  /**
   * Construit le HTML du produit sur la page product.html
   *
   * @param   {Object}  product   Object du produit
   * @return  {HTMLElement}
   * @memberof product
   */
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
                <select class="form-control mb-4">${this.getLensesOptions(product.lenses)} </select>
                <div class="row">
                  <div class="col col-lg-6">
                    <div class="form-group">
                    <div class="input-group plus-minus">
                        <div class="button minus">
                            <button type="button" class="quantity-left-minus btn btn-primary btn-number" id="minus" data-field="">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" class="input-number"  id="quantity" name="quantity" min="1" max="100" value="1">
                        <div class="button plus">
                            <button type="button" class="quantity-right-plus btn btn-primary btn-number" id="plus" data-field="">
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
                        <button id="add-in-cart" class="btn btn-sm btn-success"><i class="fas fa-cart-plus"></i> Ajouter</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    `;
  }

  /**
   * Ecoute le click sur Ajouter au panier
   *
   * @memberof product
   */
  addInMyCartClick() {
    document.getElementById("add-in-cart").addEventListener("click", this.addInMyCart);
  }

  /**
   * Ajoute au panier le produit et la quantité saisie en faisant appel
   *
   * @memberof product
   */
  addInMyCart() {
    var searchParams = new URLSearchParams(document.location.search.substring(1));
    let params = searchParams.get('id');
    let quantity = parseInt(document.getElementById("quantity").value);

    orinocoApi.apiDatas.addInCart(params, quantity);
  }

}