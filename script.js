function modPow(base, exponent, mod) {

let result = 1
base = base % mod

while (exponent > 0) {

if (exponent % 2 === 1) {
result = (result * base) % mod
}

exponent = Math.floor(exponent / 2)
base = (base * base) % mod

}

return result

}
let p, q, n, phi, e, d
let encryptedValue
let messageNumber = 88

function generateKeys(){

p = 17
q = 11

n = p * q
phi = (p-1)*(q-1)

e = 7
d = 23

let text = `
------ RSA Key Generation ------ <br>
p = ${p} <br>
q = ${q} <br><br>

n = p × q = ${n} <br>
φ(n) = (p-1)(q-1) = ${phi} <br><br>

Public Key (e,n) = (${e}, ${n}) <br>
Private Key (d,n) = (${d}, ${n}) <br><br>
`

document.getElementById("output").innerHTML = text

}

function encryptTransaction(){

let sender = document.getElementById("sender").value
let receiver = document.getElementById("receiver").value
let amount = document.getElementById("amount").value

encryptedValue = modPow(messageNumber, e, n)
let text = document.getElementById("output").innerHTML

text += `
------ Banking Transaction ------ <br>
Sender Account: ${sender} <br>
Receiver Account: ${receiver} <br>
Amount: ${amount} <br><br>

Original Transaction Message:<br>
${sender}->${receiver}:${amount} <br><br>

------ Encryption ------ <br>
Message converted to number: ${messageNumber} <br>

C = M^e mod n <br>
C = ${messageNumber}^${e} mod ${n} <br>

Encrypted Message = ${encryptedValue} <br><br>
`

document.getElementById("output").innerHTML = text

}

function decryptTransaction(){

let sender = document.getElementById("sender").value
let receiver = document.getElementById("receiver").value
let amount = document.getElementById("amount").value

let decrypted = modPow(encryptedValue, d, n)    
let text = document.getElementById("output").innerHTML

text += `
------ Decryption ------ <br>

M = C^d mod n <br>
M = ${encryptedValue}^${d} mod ${n} <br>

Decrypted Message = ${decrypted} <br><br>

Recovered Transaction:<br>
${sender}->${receiver}:${amount} <br><br>

------ Transaction Status ------ <br>

Transaction successfully decrypted.<br>

Amount ${amount} transferred from Account ${sender}
to Account ${receiver}.<br><br>

Status: <b>SECURE TRANSACTION COMPLETED</b>
`

document.getElementById("output").innerHTML = text

}