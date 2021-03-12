const orinocoApi = {
  apiDatas: new apiDatas("http://localhost:3000/api/cameras/")
};


orinocoApi.cart = new cart(document.querySelector(".shopping-cart-icon"));
orinocoApi.page = definePage();


function definePage() {
  var searchParams = new URLSearchParams(document.location.search.substring(1));
  let params = searchParams.get('id')
  var url = window.location.pathname;

  switch (url) {
    case "/produit.html":
      return new product(document.querySelector("#product-view"), params);
    case "/cart.html":
      return new cartPage(document.querySelector("tbody.cart-table-line"));
      //   case "/confirmation.html":
      //     return new Confirmation(document.querySelector("main.mainConfirmation"));
    default:
      return new home(document.querySelector("#product_list"));
  }
}