class Api {
  url = 'https://order.drcash.sh/v1/order';

  async sendForm(name, phone, test) {
    try {
      const response = await fetch(this.url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer NWJLZGEWOWETNTGZMS00MZK4LWFIZJUTNJVMOTG0NJQXOTI3',
        },
        body: JSON.stringify({
          stream_code: 'iu244',
          client: {
            name,
            phone,
          },
          sub1: test,
        }),
      });

      // throw new Error('Error');

      return response;
    } catch (err) {
      throw Error(err.message);
    }
  }
}

export default new Api();
