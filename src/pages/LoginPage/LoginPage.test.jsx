import validateEmail from "../../utils/validateEmail";

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