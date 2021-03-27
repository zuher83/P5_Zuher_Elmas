class confirmation {

  constructor(self) {
    this.self = self;
    this.removeCart(self);
  }


  /**
   * Efface le panier dans le localstorage
   *
   * @param   {object}  self
   * @memberof Confirmation
   */
  removeCart(self) {
    localStorage.removeItem("cart");
    this.confirmationHtml(self);
  }


  /**
   * Construit le html de confirmation de la commanded
   *
   * @param   {object}  self
   * @memberof Confirmation
   */
  confirmationHtml(self) {
    let customer = JSON.parse(localStorage.getItem("contact"));
    let orderId = new URLSearchParams(document.location.search.substring(1)).get('orderId');
    let totalOrder = JSON.parse(localStorage.getItem("total"));

    self.innerHTML = `
    <section class="confirmationWrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-12 section-title">
            <h1>Cher ${customer.firstName} ${customer.lastName}, nous avons le plaisir de vous confirmer votre commande
            et vous remercions pour votre achat !</h1>
          </div>
          <div class="col-md-12 text-center">
            <p>
              Votre commande n° ${orderId} d'un montant de <span id="totalOrder">${totalOrder},00€</span> a été validée.
            </p>
            <p>
              Vous recevrez votre facture par mail à l'adresse <span id="orderMail">${customer.email}</span>.
            </p>
            <p>
              L'équipe d'Orinoco vous remercie pour votre confiance !
            </p>
          </section>
          <div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

}