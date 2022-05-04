class User {
    #username;
    #email;
    #password;

    constructor(builder) {
        this.#username = builder.username;
        this.#email = builder.email;
        this.#password = builder.password;
    }

    getUsername() {
        return this.#username;
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
    }

}// User

module.exports = User;