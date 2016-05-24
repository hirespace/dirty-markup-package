var http = require('http');
var _ = require('lodash');

var defaultRequestOptions = {
    hostname: 'www.dirtymarkup.com',
    port: 80,
    path: '/src/ajax/dirty.ajax.php',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

var defaultDirtymarkupOptions = {
    code: '',
    theme: 'dark',
    'page-type': 'page',
    'brace-style': 'collapse',
    indent: 'auto',
    'indent-size': 4,
    'print-margin': 80,
    mode: 'html',
    cmd: 'clean'
};

function getEncodedData(data) {
    var parameters = [];
    _.each(data, (value, key) => {
        parameters.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    });
    return parameters.join("&")
}

function sendRequest(dirtymarkupOptions, requestOptions, callback) {
    var req = http.request(requestOptions, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', body => data += body);
        res.on('end', () => callback(JSON.parse(data)))
    });
    req.on('error', e => {
        throw e;
    });

    req.write(getEncodedData(dirtymarkupOptions));
    req.end();
}

export default function(options, callback) {
    if (!callback) {
        callback = options;
        options = false;
    }

    var dmOptions = options ? _.merge(defaultDirtymarkupOptions, options) : defaultDirtymarkupOptions;
    sendRequest(dmOptions, defaultRequestOptions, callback);
}

