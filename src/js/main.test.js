// The regex from main.js
const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Helper function to test the regex
function isValidUsername(username) {
    return regex.test(username);
}

describe('Username validation regex', () => {
    test('Valid username: meets all requirements', () => {
        expect(isValidUsername('Password1!')).toBe(true);
        expect(isValidUsername('A1b2c3d4!')).toBe(true);
        expect(isValidUsername('Valid123@')).toBe(true);
        expect(isValidUsername('XyZ9876$')).toBe(true);
    });

    test('Invalid: less than 8 characters', () => {
        expect(isValidUsername('A1!b2')).toBe(false);
        expect(isValidUsername('Ab1!')).toBe(false);
    });

    test('Invalid: missing capital letter', () => {
        expect(isValidUsername('password1!')).toBe(false);
        expect(isValidUsername('valid123@')).toBe(false);
    });

    test('Invalid: missing number', () => {
        expect(isValidUsername('Password!')).toBe(false);
        expect(isValidUsername('ValidUser@')).toBe(false);
    });

    test('Invalid: missing special character', () => {
        expect(isValidUsername('Password1')).toBe(false);
        expect(isValidUsername('Valid1234')).toBe(false);
    });

    test('Invalid: contains invalid characters', () => {
        expect(isValidUsername('Password1! ')).toBe(false); // space not allowed
        expect(isValidUsername('Password1!_')).toBe(false); // underscore not allowed
    });
});
