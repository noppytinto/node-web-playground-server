class User {
    #username;
    #email;
    #password;

    constructor(username, email, password = '') {
        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    getUsername() {
        return this.#username;
    }

    getEmail() {
        return this.#email;
    }

    

}

module.exports = User;