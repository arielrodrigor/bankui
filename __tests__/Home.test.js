import { render, screen, act } from '@testing-library/react';
import Home from '@/app/page';
import { RecoilRoot } from 'recoil';

describe('Home', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <RecoilRoot>
                    <Home />
                </RecoilRoot>
            );
        });
    });

    test('renders Header component', () => {
        const headerElement = screen.getByTestId('header-component');
        expect(headerElement).toBeInTheDocument();
    });

    test('renders AccountBalance component', () => {
        const accountBalanceElement = screen.getByTestId('account-balance-component');
        expect(accountBalanceElement).toBeInTheDocument();
    });

    test('renders History component', () => {
        const historyElement = screen.getByTestId('history-component');
        expect(historyElement).toBeInTheDocument();
    });
});
