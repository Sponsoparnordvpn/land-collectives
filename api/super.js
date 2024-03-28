function repeat_key(key, length) {
    if (key.length >= length) {
        return key.substring(0, length);
    }

    var times = Math.floor(length / key.length);
    var remain = length % key.length;

    var result = '';

    for (var i = 0; i < times; i++) {
        result += key;
    }

    if (remain > 0) {
        result += key.substring(0, remain);
    }

    return result;
}

function xor(message, key) {
    var rkey = repeat_key(key, message.length);

    var result = '';

    for (var i = 0; i < message.length; i++) {
        var k_char = rkey.charAt(i);
        var m_char = message.charAt(i);

        var k_byte = k_char.charCodeAt(0);
        var m_byte = m_char.charCodeAt(0);

        var xor_byte = m_byte ^ k_byte;

        var xor_char = String.fromCharCode(xor_byte);

        result += xor_char;
    }

    return result;
}

export default function handler(request, response) {
    const key = "5hR2p9YQK8F6ZuS3";
    
    const message = request.query.start;

    const encryptedMessage = xor(message, key);
    return response.send(encryptedMessage);
}
