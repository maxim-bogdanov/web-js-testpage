class DataStorage {

  #dataStorages = [];
  #currentStorageSource;

  setData(name, data) {
    this.#dataStorages[0].setItem(name, data);
  }

  getData(name) {
    return this.#dataStorages[0].getItem(name);
  }

  deleteData(name) {
    this.#dataStorages[0].deleteItem(name);
  }

  addDataStorage( dataStorages ){
    if( !dataStorages ) return;
    if( !Array.isArray(dataStorages) ) dataStorages = [dataStorages];
    
    dataStorages.every((dataStorage,i) => {
        // dataStorage.init( this );
        const storageSource = new dataStorage();
        console.log(i,'',storageSource)
        if( storageSource.isAvailable() ){
          this.#currentStorageSource = storageSource;
          return false;
        }
        return true;
        // this.#dataStorages.push( dataStorage );
    });

    console.log('this.#currentStorageSource', this.#currentStorageSource );

  }

  // _isLocalStorage(name, data) {
  //     // определяет куда даннные вносить: Cookie или LocalStorage
  //     // true LocalStorage
  //     // false Cookie
  //     return false;
  // }


}

export default new DataStorage();