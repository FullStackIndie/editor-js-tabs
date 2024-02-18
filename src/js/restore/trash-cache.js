export default class TrashCache {
    /// keep track of the deleted items in the active tab or in the block index
    /// remeber the html content of the deleted item and create a list of the items
    /// that are deleted to be rendered in the trash tab
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