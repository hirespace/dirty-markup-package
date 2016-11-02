var https = require('https');
var _ = require('lodash');

var defaultRequestOptions = {
    hostname: 'dirtymarkup.com',
    port: 443,
    path: '/api/html',
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
    var req = https.request(requestOptions, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', body => data += body);
        res.on('end', () => {
            var dataJson = JSON.parse(data);
            dataJson['code'] = dataJson['clean'];
            delete dataJson['clean'];
            callback(dataJson)
        })
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

    var rOptions = defaultRequestOptions;

    if (options.mode) {
        var endpoint = '/api/' + options.mode;
        rOptions = _.merge(defaultRequestOptions, { path: endpoint });
    }

    var dmOptions = options ? _.merge(defaultDirtymarkupOptions, options) : defaultDirtymarkupOptions;
    sendRequest(dmOptions, rOptions, callback);
}

