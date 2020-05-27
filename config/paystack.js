const paystack = (request) => {
    const my_secret_key = "Bearer sk_test_xxxxxx" // Replace yuor api key in place of it

    const initialize_payment = (form, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: my_secret_key,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            },
            form
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }

        request.post(options, callback)
    }

    const verifypayment = (ref, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers: {
                authorization: my_secret_key,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body);
        }
        request(options, callback);

    }
    return { initialize_payment, verifypayment }
}

module.exports = paystack