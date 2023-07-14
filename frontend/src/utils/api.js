class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async setUserInfo(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._handleResponse(response);
  }
  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._handleResponse(response);
  }
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._handleResponse(response);
  }

  async addNewCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return this._handleResponse(response);
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._handleResponse(response);
  }
  async  addLikeCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._handleResponse(response);
  }

  async deleteLikeCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return this._handleResponse(response);
  }

  async  setUserAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._handleResponse(response);
  }
}

const api = new Api({
  baseUrl: "https://api.otteliya.nomoredomains.work",
});

export default api;