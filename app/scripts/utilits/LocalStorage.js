export class LocalStorage {

    // _type = 'LocalStorage';

    // init( dataStorage ){
    //     this.dataStorage = dataStorage;
    // }

    isAvailable(){
        this.setItem("isWorking", true);
        console.log(this.getItem("isWorking"), "localStorage");
        return (this.getItem("isWorking"));
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