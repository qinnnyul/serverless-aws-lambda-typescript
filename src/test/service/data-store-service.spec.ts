import {DataStoreService} from "../../main/service/data-store-service";

describe('data saver', ()=> {
    it('should call api to save data', ()=> {

        var dataStoreService = new DataStoreService();

        var endpoint = {
            hostname: 'jsonplaceholder.typicode.com',
            port: 80,
            path: '/comments'
        };

        dataStoreService.saveDataWithAPI("test data", endpoint);
    });
});