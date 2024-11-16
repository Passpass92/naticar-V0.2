import { expect, test } from 'vitest';
import { authService } from '../services/authService';

test('registerWithEmail should create a new user', async () => {
  const email = 'test@example.com';
  const password = 'Test123!';
  const name = 'Test User';

  const user = await authService.registerWithEmail(email, password, name);
  expect(user).toBeDefined();
  expect(user.email).toBe(email);
  expect(user.displayName).toBe(name);
});

test('loginWithEmail should authenticate user', async () => {
  const email = 'test@example.com';
  const password = 'Test123!';

  const user = await authService.loginWithEmail(email, password);
  expect(user).toBeDefined();
  expect(user.email).toBe(email);
});

test('logout should sign out user', async () => {
  await authService.logout();
  // Add assertions to verify user is logged out
});