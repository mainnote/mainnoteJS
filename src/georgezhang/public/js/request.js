define(['jquery', 'optObj', 'Promise'
	], function ($, OptObj, Promise) {
    var Request = OptObj.create('Request');
    Request.extend({
        connectAsync: function (opt) {
            var that = this;
            this.setOpt(opt);

            return new Promise(function (resolve, reject) {
                $.ajax({
                        url: that.opt.request_url,
                        method: that.opt.request_method,
                        data: that.opt.request_data,
                        dataType: 'json'
                    })
                    .done(function (data, textStatus, jqXHR) {
                        if (data && 'error' in data) {
                            return reject(data.error);
                        }
                        return resolve(data);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        return reject(errorThrown);
                    });
            });
        },
    });

    return Request;
});
