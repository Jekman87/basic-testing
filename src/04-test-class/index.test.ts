import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  getBankAccount,
} from './index';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 1000;
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(initialBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account2 = getBankAccount(0);
    expect(() => account.transfer(initialBalance + 100, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depositAmount = 50;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const withdrawalAmount = 50;
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const account2 = getBankAccount(initialBalance / 2);
    const transferAmount = 30;
    account.transfer(transferAmount, account2);
    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance / 2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(80).mockReturnValueOnce(1);
    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 50;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(newBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
