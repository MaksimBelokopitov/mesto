export default class UserInfo {
    constructor ({userSelector, aboutSelector}){
    this._user = document.querySelector(userSelector);
    this._about = document.querySelector(aboutSelector);
    }

    getUserInfo(){
        this._userInfo = {};
       
        this._userInfo.user = this._user.textContent;
        this._userInfo.about = this._about.textContent;
        return this._userInfo;
    };

    setUserInfo(data){
        this._user.textContent = data.user;
        this._about.textContent = data.about
    }

    
}