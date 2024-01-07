import validateEmail from "../../utils/validateEmail";
import {
   passwordLength,
   passwordContainsUppercase,
   passwordContainsLowercase,
   passwordContainsNumber,
   passwordContainsSpecialCharacter,
   passwordsMatch
} from "../../utils/validatePassword";

// Test case 1: Valid email
test('Valid email should return true', () => {
   const email = 'test@example.com';
   const isValid = validateEmail(email);
   expect(isValid).toBe(true);
});

// Test case 2: Invalid email (missing '@' symbol)
test('Missing @ symbol should return false', () => {
   const email = 'testexample.com';
   const isValid = validateEmail(email);
   expect(isValid).toBe(false);
});

// Test case 3: Invalid email (missing '.' symbol)
test('Missing . symbol should return false', () => {
   const email = 'test@examplecom';
   const isValid = validateEmail(email);
   expect(isValid).toBe(false);
});

// Test case 4: Invalid email (length less than 3)
test('Less than 3 characters should return false', () => {
   const email = 'a@';
   const isValid = validateEmail(email);
   expect(isValid).toBe(false);
});

// Test case 5: Valid password (length between 8 and 42)
test('Valid password should return true', () => {
   const password = 'ValidPassword@123';
   const isValid = passwordLength(password);
   expect(isValid).toBe(true);
});

// Test case 6: Invalid password (length less than 8)
test('Password less than 8 characters should return false', () => {
   const password = 'short';
   const isValid = passwordLength(password);
   expect(isValid).toBe(false);
});

// Test case 7: Invalid password (length greater than 42)
test('Password greater than 42 characters should return false', () => {
   const password = 'ThisIsAVeryLongPasswordThatIsGreaterThan42Characters';
   const isValid = passwordLength(password);
   expect(isValid).toBe(false);
});

// Test case 8: Valid password (contains uppercase letter)
test('Valid password should contain at least one uppercase letter', () => {
   const password = 'ValidPassword@123';
   const isValid = passwordContainsUppercase(password);
   expect(isValid).toBe(true);
});

// Test case 9: Invalid password (does not contain uppercase letter)
test('Password does not contain uppercase letter should return false', () => {
   const password = 'validpassword@123';
   const isValid = passwordContainsUppercase(password);
   expect(isValid).toBe(false);
})

// Test case 10: Valid password (contains lowercase letter)
test('Valid password should contain at least one lowercase letter', () => {
   const password = 'ValidPassword@123';
   const isValid = passwordContainsLowercase(password);
   expect(isValid).toBe(true);
});

// Test case 11: Invalid password (does not contain lowercase letter)
test('Password does not contain lowercase letter should return false', () => {
   const password = 'VALIDPASSWORD@123';
   const isValid = passwordContainsLowercase(password);
   expect(isValid).toBe(false);
})

// Test case 12: Valid password (contains number)
test('Valid password should contain at least one number', () => {
   const password = 'ValidPassword@123';
   const isValid = passwordContainsNumber(password);
   expect(isValid).toBe(true);
});

// Test case 13: Invalid password (does not contain number)
test('Password does not contain number should return false', () => {
   const password = 'ValidPassword@';
   const isValid = passwordContainsNumber(password);
   expect(isValid).toBe(false);
})

// Test case 14: Valid password (contains special character)
test('Valid password should contain at least one special character', () => {
   const password = 'ValidPassword@123';
   const isValid = passwordContainsSpecialCharacter(password);
   expect(isValid).toBe(true);
});

// Test case 15: Invalid password (does not contain special character)
test('Password does not contain special character should return false', () => {
   const password = 'ValidPassword123';
   const isValid = passwordContainsSpecialCharacter(password);
   expect(isValid).toBe(false);
});

// Test case 16: Passwords do not match
test('Passwords do not match should return false', () => {
   const password = 'ValidPassword@123';
   const confirmPassword = 'DifferentPassword@123';
   const isValid = password === confirmPassword;
   expect(isValid).toBe(false);
});

// Test case 17: Passwords match
test('Passwords match should return true', () => {
   const password = 'ValidPassword@123';
   const confirmPassword = 'ValidPassword@123';
   const isValid = password === confirmPassword;
   expect(isValid).toBe(true);
})
