

export const query = (endpoint, form) => {
    var formBody = [];
    for (var property in form) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(form[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch('http://cognitapp.duckdns.org/' + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
        .then((response) => response.json())
        .then((jsoned) => {
            return jsoned;
        })
}