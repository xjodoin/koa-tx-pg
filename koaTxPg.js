'use strict';

var pg = require('co-pg')


module.exports = function (opts) {

    if (typeof opts === 'string') {
        opts = { conStr: opts };
    }

    return function *koaTxPg(next) {

        var connect = yield pg.connect_(opts.conStr);
        var client = connect[0];
        var done = connect[1];

        yield client.query_('BEGIN');
        this.txClient = client;
        yield next;
        yield client.query_('COMMIT');
        done();

    }

}
