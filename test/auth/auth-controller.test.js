const {_emailIsValid, _passIsValid} = require('../../src/auth/auth-controller');

describe('auth-controller', () => {

    // _emailIsValid()
    describe('_emailIsValid()', () => {

        // valid
        it('returns true if email is valid', () => {
            const email = 'foo@mail.com';
            expect(_emailIsValid(email)).toBe(true);
        })

        it('returns false if email is valid', () => {
            const email = '123@mail.com';
            expect(_emailIsValid(email)).toBe(true);
        })

        it('returns false if email is valid', () => {
            const email = 'foo@123.com';
            expect(_emailIsValid(email)).toBe(true);
        })

        it('returns false if email is valid', () => {
            const email = 'foo@mail.123';
            expect(_emailIsValid(email)).toBe(true);
        })


        // invalid
        it('returns false if email is invalid', () => {
            const email = '';
            expect(_emailIsValid(email)).toBe(false);
        })

        it('returns false if email is invalid', () => {
            const email = null;
            expect(_emailIsValid(email)).toBe(false);
        })

        it('returns false if email is invalid', () => {
            const email = undefined;
            expect(_emailIsValid(email)).toBe(false);
        })

        it('returns false if email is invalid', () => {
            const email = '@mail.com';
            expect(_emailIsValid(email)).toBe(false);
        })

        it('returns false if email is invalid', () => {
            const email = 'foo@';
            expect(_emailIsValid(email)).toBe(false);
        })

        it('returns false if email is invalid', () => {
            const email = 'foomail.com';
            expect(_emailIsValid(email)).toBe(false);
        })

        it('returns false if email is invalid', () => {
            const email = 'foo.com';
            expect(_emailIsValid(email)).toBe(false);
        })

        it('returns false if email is invalid', () => {
            const email = 'foo@mailcom';
            expect(_emailIsValid(email)).toBe(false);
        })


        it('returns false if email is invalid', () => {
            const email = 'foo@mail.';
            expect(_emailIsValid(email)).toBe(false);
        })

        it('returns false if email is invalid', () => {
            const email = 'foo#mail.com';
            expect(_emailIsValid(email)).toBe(false);
        })



    });// describe _emailIsValid()

    // _passIsValid()
    describe('_passIsValid()', () => {

        // valid
        it('returns true if password.length >=6 ', () => {
            const password = '123456';
            expect(_passIsValid(password)).toBe(true);
        })

        it('returns true if password.length >=6 ', () => {
            const password = '1234567890';
            expect(_passIsValid(password)).toBe(true);
        })

        it('returns true if password.length >=6 ', () => {
            const password = 'abcdefgjklmn';
            expect(_passIsValid(password)).toBe(true);
        })



        // invalid
        it('returns false if password.length <6 ', () => {
            const password = '12345';
            expect(_passIsValid(password)).toBe(false);
        })

        it('returns false if password == "" ', () => {
            const password = '';
            expect(_passIsValid(password)).toBe(false);
        })

        it('returns false if password == null ', () => {
            const password = null;
            expect(_passIsValid(password)).toBe(false);
        })

        it('returns false if password == undefined ', () => {
            const password = undefined;
            expect(_passIsValid(password)).toBe(false);
        })
    });// describe _passIsValid()
    


});// describe auth-controller