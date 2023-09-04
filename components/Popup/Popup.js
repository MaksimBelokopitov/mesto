export default class Popup {
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }

    open(){
        this._popup.classList.add('popup_opened');
    };

    close(){
        this._popup.classList.remove('popup_opened');
    };

    _handleEscClose(event){
        if( event.key === 'Escape'){
            this.close();
        };
    };

    setEventListener(){
        document.addEventListener('keydown', () => {
            this._handleEscClose(event)
        })
        this._popup.addEventListener('mouseup', (event) => { 
            const targetClassList = event.target.classList; 
            if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) { 
              this.close(); 
            };
        });
    };

    
  
}