import Router from '../lib/router';
import assert from 'assert';

describe('Router', () => {
    it('should create an instance of Router', () => {
        let router = new Router();
        assert(router instanceof Router);
    });

    it('should register and get handle handler', () => {
        let router = new Router();
        var handler = function (req, res) {

        };
        router.register('GET', '/path', handler);

        assert(router.get('GET', '/path') != null);
        assert(router.get('GET', '/path') == handler);
    })
});
