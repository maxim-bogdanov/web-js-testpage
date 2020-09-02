export class LocalStorage {

    // _type = 'LocalStorage';

    // init( dataStorage ){
    //     this.dataStorage = dataStorage;
    // }

    isAvailable(){
        return true;
    }

    setItem(name, data) {
        localStorage.setItem(name, data);
    }

    getItem(name) {
        return localStorage.getItem(name); 
    }

    deleteItem(name) {
        localStorage.removeItem(name);
    }
}