class home {
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   * @constructor
   */
  constructor(homePage) {
    this.getAllProductItems(homePage);
  }

  async getAllProductItems(homePage) {

    let content = "";
    try {
      const products = await orinocoApi.apiDatas.allProductItems();
      // for (let x = 0, size = products.length; x < size; x++) {
      for (let p = 0; p < products.length; p++) {
        content += this.buildHtmlProduct(products[p]);
      }

    } catch (err) {
      console.error(err);
    }

    homePage.innerHTML = content;
  }

  buildHtmlProduct(product) {
    return `
      <div class="col-md-4 col-sm-12 mb-4">
        <div class="card" data-id="${product._id}">
            <a href="produit.html?id=${product._id}">
                <figure>
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.description}">
                </figure>
            </a>
            <div class="card-body">
                <h2 class="card-title">${product.name} </h2>
                <div class="card-text">${product.description} </div>
                <div class="row pt-3">
                    <div class="col">
                        <div class="prix label label-danger">${product.price / 100} €</div>
                    </div>
                    <div class="col">
                        <a href="#" class="btn btn-sm btn-success"><i class="fas fa-cart-plus"></i> Add</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    `;
  }

}