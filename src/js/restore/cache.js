export default class Cache {
    /// keep track of the last block changes for a period of time or actions
    /// in the active tab or in the block index in the tabs array
    /// remeber the html content of the changed item and create a linear list of the items
    /// if an item was deleted transfer it to the trash cache
    constructor() {
        this.cache = [];
    }
    
    addCacheItem(item) {
        this.cache.push(item);
    }
    
    removeCacheItem(item) {
        this.cache = this.cache.filter((cacheItem) => cacheItem !== item);
    }
    
    getCache() {
        return this.cache;
    }
}