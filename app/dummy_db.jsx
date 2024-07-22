class DummyDB {
    constructor() {
      this.data = [
        { id: 1, name: 'Item 1', description: 'This is item 1' },
        { id: 2, name: 'Item 2', description: 'This is item 2' },
        { id: 3, name: 'Item 3', description: 'This is item 3' }
      ];
    }
  
    query(id) {
      return new Promise((resolve, reject) => {
        const result = this.data.find(item => item.id === id);
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Item not found'));
        }
      });
    }
  }
  