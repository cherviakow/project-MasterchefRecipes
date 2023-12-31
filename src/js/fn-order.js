import { Notify } from "notiflix";
import {FetchInfo} from "./Api/api-add_order";
import {saveInLocalStorageModal, resetLocalStorageModal, returnObjectOfModal, isInLSModalKey} from './local-storage';

const fetch = new FetchInfo();

export function openOrderModal(){
  createModal(orderModalMarkup());

  addBorder();

  const form = document.querySelector('.form-oder');
  const SendBtnOrder = document.querySelector('.order-submit');
  const {name, phone, email, comment} = form.elements;

  if(isInLSModalKey()){
    const saveInLSInput = returnObjectOfModal();
    name.value = saveInLSInput.name;
    phone.value = saveInLSInput.phone;
    email.value = saveInLSInput.email;
    comment.value = saveInLSInput.comment;
  }

  form?.addEventListener('input', () => {
    const objForLocal = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      comment: comment.value,
    }
    saveInLocalStorageModal(objForLocal)});
    form?.addEventListener('submit', submitForm);

  function submitForm(e) {
    e.preventDefault();
  
    if(name.value === '' || phone.value === '' || email.value === '' || comment.value === '')
    return Notify.info('Please, fill all fields!');
  
    const dataForm = returnObjectOfModal();

    fetch.postOrderApi(dataForm.name, dataForm.phone, dataForm.email, dataForm.comment)
    .then(() => {
      SendBtnOrder.classList.add('close');
      Notify.success('Thanks for your order!');
      resetLocalStorageModal();
    })
    .catch((error) => {return Notify.warning(`${error.response.data.message}`)});
  }
}


function orderModalMarkup(){
  return `<div class="modal-order">
  <button class="order-btn-close close-button" type="button">x</button>
  <p class="order-title">Order now</p>
  <form class="form-oder">
    <label class="order-form-label">
      <span class="order-form-span">Name</span>
      <input
        class="order-form-input"
        type="text"
        name="name"
        pattern="[A-z]{1,15}"
        placeholder="Your name"
      />
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Phone number</span>
      <input
        class="order-form-input"
        type="text"
        name="phone"
        placeholder="Your phone: +380681112233"
      />
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Email</span>
      <input class="order-form-input" type="email" name="email" placeholder="Your email: dog@gmail.com"/>
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Comment</span>
      <textarea class="order-form-textarea" name="comment" placeholder="Your comment"></textarea>
    </label>
    <button class="order-submit base-btn" type="submit">Send</button>
  </form>
</div>`
}
