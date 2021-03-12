class cart {


  content = [];


  constructor(self) {
    this.self = self;
    // this.cartUpdate();
  }

  add(productId, qty = 1) {

    for (let i = 1; i <= qty; i++) {
      this.content.push(productId);
    }
    // console.log(this.content);

    orinocoApi.apiDatas.setCart(this.content);
  }



}

class cartPage {

  constructor(self) {
    this.self = self;
  }

}