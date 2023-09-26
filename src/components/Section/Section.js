export default class Section {
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.append(element);
    }

    addNewItem(element) {
        this._container.prepend(element);
    };

    renderItems(data, userId) {
        data.forEach((item) => {
          this._renderer(item, userId);
        })
    }
}

