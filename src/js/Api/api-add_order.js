// https://tasty-treats-backend.p.goit.global/api/orders

export class FetchInfo {
    constructor(id) {
      this.BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
    }


    postOrderApi(name, phone, email, comment) {
        return axios({
          url: `${this.BASE_URL}orders/add`,
          method: 'POST',
          data: {
            name: name,
            phone: phone,
            email: email,
            comment: comment,
          },
        });
      }
    }