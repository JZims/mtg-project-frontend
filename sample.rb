require "openssl"
require "base64"

var encodedString = Base64.encode64(header) + "." + Base64.encode64(payload);
hash  = OpenSSL::HMAC.digest("sha256", "secret", encodedString)