import {render, screen, act, renderHook, waitFor} from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
import History from "../components/History";
import useTransactions from "../components/History/useTransactions";


jest.mock('axios');

describe('Index', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                transacciones: [
                    {
                        tipo: 'DEPOSITO',
                        monto: 100,
                        balance: 1000,
                        Date: { _seconds: 1612444800, _nanoseconds: 0 },
                    },
                    {
                        tipo: 'RETIRO',
                        monto: 50,
                        balance: 950,
                        Date: { _seconds: 1612531200, _nanoseconds: 0 },
                    }
                ]
            }
        });
    });

    afterEach(() => {
        axios.get.mockReset();
    });

    test('renders History component', async () => {
        await act(async () => {
            render(
                <RecoilRoot>
                    <History />
                </RecoilRoot>
            );
        });

        const historyElement = screen.getByTestId('history-component');
        expect(historyElement).toBeInTheDocument();
    });

    test('makes axios.get call on render', async () => {
        await act(async () => {
            render(
                <RecoilRoot>
                    <History />
                </RecoilRoot>
            );
        });

        expect(axios.get).toHaveBeenCalled();
    });

    test('renders transaction data', async () => {
        await act(async () => {
            render(
                <RecoilRoot>
                    <History />
                </RecoilRoot>
            );
        });

        // Then make your assertions
        expect(screen.getByText(/Deposit/i)).toBeInTheDocument();
        expect(screen.getByText(/Withdrawal/i)).toBeInTheDocument();

        const depositAmount = screen.getAllByText((content, node) => {
            const hasText = (node) => node.textContent === "+$100";
            const nodeHasText = hasText(node);
            const childrenDontHaveText = Array.from(node.children).every(
                (child) => !hasText(child)
            );

            return nodeHasText && childrenDontHaveText;
        });
        expect(depositAmount).toBeTruthy();

        const withdrawalAmount = screen.getAllByText((content, node) => {
            const hasText = (node) => node.textContent === "-$50";
            const nodeHasText = hasText(node);
            const childrenDontHaveText = Array.from(node.children).every(
                (child) => !hasText(child)
            );

            return nodeHasText && childrenDontHaveText;
        });
        expect(withdrawalAmount).toBeTruthy();

        expect(screen.getByText('$1000')).toBeInTheDocument();
        expect(screen.getByText('$950')).toBeInTheDocument();
    });


    describe('useTransactions', () => {
        it('sets an error when axios.get fails', async () => {
            axios.get.mockRejectedValueOnce(new Error('Test error'));

            const { result, waitForValueToChange } = renderHook(() => useTransactions());

            await act(async () => {
                await waitFor(() => result.current.error);
            });

            expect(result.current.error).toBe('Test error');
        });
    });


});

