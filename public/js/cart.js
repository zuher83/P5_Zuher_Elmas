class cartPage {

  constructor(self) {
    this.self = self;
    this.cartListProducts(self);
    this.checkForm();
    this.validateOrder();
  }

  /**
   * Affiche la liste du panier dans un tableau Html. Les produits
   * sont regroupé par ID et les quantités additionnés
   *
   * Le total de la commande est mis à jour à chaque changement
   *
   * @param   {HTMLElement} self
   * @memberof cartPage
   */
  async cartListProducts(self) {
    let content = "";
    let total = 0;
    try {
      const cartContent = await orinocoApi.apiDatas.groupCart();

      for (const [key, value] of Object.entries(cartContent)) {
        const product = await orinocoApi.apiDatas.productItem(key);
        total += (product.price / 100) * value;
        let totalLine = (product.price / 100) * value;
        content += this.buildHtmlCartTable(product, value, totalLine);
      }
    } catch (err) {
      console.error(err);
    }

    self.innerHTML = content;
    this.updateTotalCart(total);
    this.removeProduct(self);
  }

  /**
   * Ajoute le montant total de la commande au pied et le stock dans le localstorage
   *
   * @param   {String}  total   Montant total de la commande converti en Number et formaté
   * @memberof cartPage
   */
  updateTotalCart(total) {
    document.querySelector(".order-subtotal").innerHTML = Number.parseFloat(total).toFixed(2) + '€';
    document.querySelector(".order-paid").innerHTML = Number.parseFloat(total).toFixed(2) + '€';
    localStorage.setItem('total', total);
  }

  /**
   * Injecte dans le tableau Html du panier chaque ligne de commande
   *
   * @param   {Object}  product Objet du produit
   * @param   {String}  product._id
   * @param   {String}  product.imageUrl
   * @param   {String}  product.name
   * @param   {String}  product.description
   * @param   {Number}  product.price
   * @param   {Number}  [qty=1] Quantité total de chaque produit
   * @param   {Number}  total  Montant total de chaque ligne de produit
   * @return  {HTMLElement} retourne une ligne <tr> avec les éléments Html
   * @memberof cartPage
   */
  buildHtmlCartTable(product, qty = 1, total) {
    return `
    <tr id="${product._id}">
      <td class="image" data-title="No"><img src="${product.imageUrl}" alt="#"></td>
      <td class="product-des" data-title="Description">
        <p class="product-name"><a href="produit.html?id=${product._id}">${product.name}</a></p>
        <p class="product-des">${product.description}</p>
      </td>
      <td class="price" data-title="Price"><span>${product.price / 100}</span></td>
      <td class="qty" data-title="Qty"><!-- Input Order -->
        <span>${qty}</span>
      </td>
      <td class="total-amount" data-title="Total"><span>${Number.parseFloat(total).toFixed(2) + '€'}</span></td>
      <td class="action" data-title="Remove""><a href="#" class="remove" data-id="${product._id}"><i class="far fa-trash-alt"></i></a></td>
    </tr>
    `
  }


  removeProduct(self) {
    self.querySelectorAll('a.remove').forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        let product = item.getAttribute('data-id');
        orinocoApi.apiDatas.removeProductInCart(product);
      })
    })
  }

  /**
   * Vérifie de manière dynamique le formulaire de client
   * Chaque champ et vérifié durant la saisie et une class et ajouté si valid ou invalid
   *
   * @memberof cartPage
   */
  checkForm() {
    let firstName = document.getElementById('validationFirstName');
    let name = document.getElementById('validationName');
    let rue = document.getElementById('validationRue');
    let ville = document.getElementById('validationVille');
    let codePostal = document.getElementById('validationCodePostal');
    let email = document.getElementById('validatedInputEmail');
    let confirmationEmail = document.getElementById('validatedInputEmailConfirmation');
    let cgvAccept = document.getElementById('invalidCheck3');
    let postalRegex = /^\d{5}$|^\d{5}-\d{4}$/;
    let textRegex = /^[a-zA-Z0-9\s,'-]*$/;
    let emailRegex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;;

    firstName.addEventListener('change', function () {
      if (textRegex.test(firstName.value)) {
        firstName.classList.add('is-valid');
        firstName.classList.remove('is-invalid');
      } else {
        firstName.classList.remove('is-valid');
        firstName.classList.add('is-invalid');
      }
    });

    name.addEventListener('change', function () {
      if (textRegex.test(name.value)) {
        name.classList.add('is-valid');
        name.classList.remove('is-invalid');
      } else {
        name.classList.remove('is-valid');
        name.classList.add('is-invalid');
      }
    });

    rue.addEventListener('change', function () {
      if (textRegex.test(rue.value)) {
        rue.classList.add('is-valid');
        rue.classList.remove('is-invalid');
      } else {
        rue.classList.remove('is-valid');
        rue.classList.add('is-invalid');
      }
    });

    ville.addEventListener('change', function () {
      if (textRegex.test(ville.value)) {
        ville.classList.add('is-valid');
        ville.classList.remove('is-invalid');
      } else {
        ville.classList.remove('is-valid');
        ville.classList.add('is-invalid');
      }
    });

    codePostal.addEventListener('change', function () {
      if (postalRegex.test(codePostal.value)) {
        codePostal.classList.add('is-valid');
        codePostal.classList.remove('is-invalid');
      } else {
        codePostal.classList.remove('is-valid');
        codePostal.classList.add('is-invalid');
      }
    });

    email.addEventListener('change', function () {
      if (emailRegex.test(email.value)) {
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
        email.parentNode.classList.add('is-valid');
        email.parentNode.classList.remove('is-invalid');
      } else {
        email.classList.remove('is-valid');
        email.classList.add('is-invalid');
        email.parentNode.classList.remove('is-valid');
        email.parentNode.classList.add('is-invalid');
      }
    });

    confirmationEmail.addEventListener('change', function () {
      if (email.value === confirmationEmail.value) {
        confirmationEmail.classList.add('is-valid');
        confirmationEmail.classList.remove('is-invalid');
        confirmationEmail.parentNode.classList.add('is-valid');
        confirmationEmail.parentNode.classList.remove('is-invalid');
      } else {
        confirmationEmail.classList.remove('is-valid');
        confirmationEmail.classList.add('is-invalid');
        confirmationEmail.parentNode.classList.remove('is-valid');
        confirmationEmail.parentNode.classList.add('is-invalid');
      }
    });

    cgvAccept.addEventListener('change', function () {
      if (cgvAccept.checked) {
        cgvAccept.classList.add('is-valid');
        cgvAccept.classList.remove('is-invalid');
      } else {
        cgvAccept.classList.remove('is-valid');
        cgvAccept.classList.add('is-invalid');
      }
    });
  }

  /**
   * Vérifie si le pannier n'est pas vide au clique de validation
   * Si le panier est vide une alerte est envoyé sinon on appelle
   * la function formsubmit()
   *
   * @memberof cartPage
   */
  validateOrder() {
    document.getElementById("customer-form").addEventListener("submit", event => {
      event.preventDefault();
      if (orinocoApi.apiDatas.getCart().length > 0) {
        this.formSubmit();
      } else {
        alert("Votre panier est vide! Merci de choisir un produit!")
      }
    })
  }

  /**
   * Vérification avant envoi au backend du formulaire et du contenu du panier
   *
   * Si tout est valide alors on envoi la requête à orderCamerasInCart() dans l'api fronted
   * pour soumission au backend
   *
   * @memberof cartPage
   */
  formSubmit() {
    let firstName = document.getElementById('validationFirstName');
    let name = document.getElementById('validationName');
    let rue = document.getElementById('validationRue');
    let ville = document.getElementById('validationVille');
    let codePostal = document.getElementById('validationCodePostal');
    let email = document.getElementById('validatedInputEmail');
    let confirmationEmail = document.getElementById('validatedInputEmailConfirmation');
    let cgvAccept = document.getElementById('invalidCheck3');
    let postalRegex = /^\d{5}$|^\d{5}-\d{4}$/;
    let textRegex = /^[a-zA-Z0-9\s,'-]*$/;
    let emailRegex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;

    if (textRegex.test(firstName.value) !== true | firstName.value == "") {
      alert("Merci d'indiquer votre prénom");
    }
    if (textRegex.test(name.value) !== true | name.value == "") {
      alert("Merci d'indiquer votre nom");
    }
    if (textRegex.test(rue.value) !== true | rue.value == "") {
      alert("Merci d'indiquer votre rue");
    }
    if (textRegex.test(ville.value) !== true | ville.value == "") {
      alert("Merci d'indiquer votre ville");
    }
    if (postalRegex.test(codePostal.value) !== true | codePostal.value == "") {
      alert("Merci d'indiquer votre code postal");
    }
    if (emailRegex.test(email.value) !== true | email.value == "" & email.value !== confirmationEmail.value) {
      alert("Merci d'indiquer votre email");
    }
    if (cgvAccept.checked !== true) {
      alert("Merci d'accepter nos CGV");
    }if (textRegex.test(firstName.value) !== true | firstName.value == "") {
      alert("Merci d'indiquer votre prénom");
    }
    if (textRegex.test(name.value) !== true | name.value == "") {
      alert("Merci d'indiquer votre nom");
    }
    if (textRegex.test(rue.value) !== true | rue.value == "") {
      alert("Merci d'indiquer votre rue");
    }
    if (textRegex.test(ville.value) !== true | ville.value == "") {
      alert("Merci d'indiquer votre ville");
    }
    if (postalRegex.test(codePostal.value) !== true | codePostal.value == "") {
      alert("Merci d'indiquer votre code postal");
    }
    if (emailRegex.test(email.value) !== true | email.value == "" & email.value !== confirmationEmail.value) {
      alert("Merci d'indiquer votre email");
    }
    if (cgvAccept.checked !== true) {
      alert("Merci d'accepter nos CGV");
    }

    // informations du contact
    let contact = {
      firstName: firstName.value,
      lastName: name.value,
      address: rue.value,
      city: ville.value,
      email: email.value
    }

    // ID des produits du panier
    let products = JSON.parse(orinocoApi.apiDatas.getCart());

    // @type {Object} on groupe les deux variables
    let orderCart = JSON.stringify({
      contact,
      products
    });

    localStorage.setItem('contact', JSON.stringify(contact));
    orinocoApi.apiDatas.orderCamerasInCart(orderCart);
  }
}