passwords.before.insert(function(userId, doc) {
  doc.ownerId = userId;
  encrypted = CryptoJS.AES.encrypt(doc.password, Meteor.settings.encryptPassphrase);
  doc.password = encrypted.toString();
});

Meteor.methods({
  decryptPassword : function(password) {
    decrypted = CryptoJS.AES.decrypt(password, Meteor.settings.encryptPassphrase);
    console.log(decrypted);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
})