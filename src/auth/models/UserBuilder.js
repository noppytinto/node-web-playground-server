const User = require('./User');

class UserBuilder {
    username;
    email;
    password;

    constructor(email) {
        this.email = email;
    }

    setUsername(username) {
        this.username = username;
        return this;
    }

    setPassword(pass) {
        this.password = pass;
        return this;
    }

    build() {
        return new User(this);
    }

}// UserBuilder

module.exports = UserBuilder;