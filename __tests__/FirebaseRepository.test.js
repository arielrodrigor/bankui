import {FirebaseRepository} from "../infra/FirebaseRepository";
import {adminDb} from "../firebaseAdmin";

describe('FirebaseRepository', () => {
    let mockAdminDb;
    let mockDocRef;
    let firebaseRepository;

    beforeEach(() => {
        // Mock adminDb and its methods
        mockDocRef = {
            set: jest.fn(),
            get: jest.fn(),
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnThis(),
            add: jest.fn()
        };

        mockAdminDb = {
            collection: jest.fn().mockReturnThis(),
            doc: jest.fn().mockReturnValue(mockDocRef),
        };

        // Overwrite the original adminDb with the mock
        adminDb.collection = mockAdminDb.collection;
        adminDb.doc = mockAdminDb.doc;

        firebaseRepository = new FirebaseRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Tests for saveAccount() method
    describe('saveAccount', () => {
        it('should save the account and its transactions', async () => {
            const accountNumber = '123456789';
            const accountData = {
                transacciones: [{}, {}],
                // include any other necessary properties
            };

            await firebaseRepository.saveAccount(accountNumber, accountData);

            expect(mockDocRef.set).toHaveBeenCalledWith(accountData);
            expect(mockDocRef.add).toHaveBeenCalledTimes(accountData.transacciones.length);
        });
    });

    // Tests for getAccountByNumber() method
    describe('getAccountByNumber', () => {
        it('should return the account data by number', async () => {
            const accountNumber = '123456789';
            const mockDoc = {
                exists: true,
                data: jest.fn().mockReturnValue({}),
            };
            mockDocRef.get.mockResolvedValueOnce(mockDoc);

            const accountData = await firebaseRepository.getAccountByNumber(accountNumber);

            expect(accountData).toEqual(mockDoc.data());
            expect(mockDocRef.get).toHaveBeenCalled();
        });

        it('should return null if account does not exist', async () => {
            const accountNumber = '123456789';
            const mockDoc = {
                exists: false,
                data: jest.fn()
            };
            mockDocRef.get.mockResolvedValueOnce(mockDoc);

            const accountData = await firebaseRepository.getAccountByNumber(accountNumber);

            expect(accountData).toBeNull();
            expect(mockDocRef.get).toHaveBeenCalled();
            expect(mockDoc.data).not.toHaveBeenCalled();
        });

    });

    it('should return null if account exists but has no data', async () => {
        const accountNumber = '123456789';
        const mockDoc = {
            exists: true,
            data: jest.fn().mockReturnValue(undefined),  // Simulate a document with no data
        };
        mockDocRef.get.mockResolvedValueOnce(mockDoc);

        const accountData = await firebaseRepository.getAccountByNumber(accountNumber);

        expect(accountData).toBeNull();
        expect(mockDocRef.get).toHaveBeenCalled();
        expect(mockDoc.data).toHaveBeenCalled();
    });


    // Tests for getTransactionsForAccount() method
    describe('getTransactionsForAccount', () => {
        it('should return transactions for the account', async () => {
            const accountNumber = '123456789';
            const mockQuerySnapshot = {
                docs: [{}, {}],  // You can mock this according to your needs
            };
            mockDocRef.get.mockResolvedValueOnce(mockQuerySnapshot);

            const transactions = await firebaseRepository.getTransactionsForAccount(accountNumber);

            expect(transactions).toEqual(mockQuerySnapshot);
            expect(mockDocRef.get).toHaveBeenCalled();
        });
    });
});
