export default class UserInfo {
    constructor ({userSelector, aboutSelector, avatarSelector}){
    this._user = document.querySelector(userSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        this._userInfo = {};
       
        this._userInfo.name = this._user.textContent;
        this._userInfo.about = this._about.textContent;
        return this._userInfo;
    };

    setUserInfo(data){
        this._user.textContent = data.name;
        this._about.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data;
    }

    getUserId(data){
        const userId = data._id;
        console.log(userId);
        return userId
    }



    
}