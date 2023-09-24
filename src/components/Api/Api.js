export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _getRequest (url, options) {
        return fetch(url, options)
        .then((res) => {
            if(res.ok) {
                return res.json()
            }

            throw new Error('Что-то пошло не так...')
        })
        .catch((error) => {
            console.log(error);
        })
    }

    getUserInfo(){
       return this._getRequest(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
       })
    }

    getInitialCards(){
        return this._getRequest(`${this._url}/cards`, {
          method: 'GET',
          headers: this._headers
          })
      }

    getPageData(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
    
    setUserAvatar(link){
      return this._getRequest(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers, 
        body: JSON.stringify({
            avatar: link
          })
      })
    }

    setUserInfo(data){
      return this._getRequest(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers, 
        body: JSON.stringify({
          name: data.name,
          about: data.about
          })
        })
    }

 

    createNewCard(data){
        return this._getRequest(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers, 
            body: JSON.stringify({
              name: data.name,
              link: data.link
              })
            })  
    };

    deleteCard(data){
        return this._getRequest(`${this._url}/cards/${data}`, {
            method: 'DELETE',
            headers: this._headers, 
            })  
    }

   likeCard(data){
      return this._getRequest(`${this._url}/cards/${data}/likes`, {
          method: 'PUT',
          headers: this._headers, 
          })  
    };

    dislikeCard(data){
      return this._getRequest(`${this._url}/cards/${data}/likes`, {
        method: 'DELETE',
        headers: this._headers, 
        })  
    }



} 
