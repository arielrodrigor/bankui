import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

jest.mock('firebase-admin', () => ({
    credential: {
        cert: jest.fn().mockReturnValue({}), // Aquí retornamos un objeto vacío
    },
    initializeApp: jest.fn(),
    firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                set: jest.fn(),
            })),
        })),
    })),
}));

jest.mock('firebase-admin', () => ({
    credential: {
        cert: jest.fn().mockImplementation((serviceAccount) => serviceAccount), // Aquí devolvemos el serviceAccount
    },
    initializeApp: jest.fn(),
    firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                set: jest.fn(),
            })),
        })),
    })),
}));


jest.mock('firebase-admin/app', () => ({
    getApps: jest.fn(),
}));

describe('Firebase Admin Initialization', () => {
    afterEach(() => {
        jest.resetAllMocks();

    });


    it('should initialize firebase admin if no apps exist', () => {
        getApps.mockReturnValue([]);
        const serviceAccount = { projectId: 'bankui-test' };
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY = JSON.stringify(serviceAccount);

        require('@/firebaseAdmin'); // Aquí va tu ruta al módulo

        expect(admin.initializeApp).toHaveBeenCalledWith({
            credential: expect.any(Object),
        });
    });

    it('should not initialize firebase admin if apps already exist', () => {
        getApps.mockReturnValue([{}]); // Simulamos que ya existe una app
        const serviceAccount = { projectId: 'bankui-test' };
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY = JSON.stringify(serviceAccount);

        require('@/firebaseAdmin'); // Aquí va tu ruta al módulo

        expect(admin.initializeApp).not.toHaveBeenCalled();
    });

});
