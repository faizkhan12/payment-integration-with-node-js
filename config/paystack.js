const paystack = (request) => {
    const my_secret_key = "Bearer sk_test_c8cc009f94163f2234765425b22213dcacf32361"

    const initializePayment = (form, mycallback) => {
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

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers: {
                authorization: my_secret_key,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request(options, callback)
    }

    return { initializePayment, verifyPayment };
}

module.exports = paystack;