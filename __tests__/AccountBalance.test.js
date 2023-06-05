import React from "react";
import {render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import AccountBalance from "@/components/AccountBalance";
import { RecoilRoot } from 'recoil';
import axios from 'axios';

jest.mock('axios');

afterEach(() => {
    axios.post.mockReset();
});

describe('AccountBalance', () => {

    beforeEach(async () => {
        axios.post.mockResolvedValue({ data: { balance: 1000 } });
        render(
            <RecoilRoot>
                <AccountBalance />
            </RecoilRoot>
        );

        await screen.findByText(/\$\d+/);
    });

    test('changes to deposit view when deposit button is clicked', async () => {
        fireEvent.click(screen.getByText(/deposit/i));

        await waitFor(() => screen.getByPlaceholderText(/amount/i));
    });

    test('changes to withdrawal view when withdrawal button is clicked', async () => {
        fireEvent.click(screen.getByText(/withdrawal/i));

        await waitFor(() => screen.getByPlaceholderText(/amount/i));
    });
    afterEach(() => {
        axios.post.mockReset();
    });

    test('should call deposit when amount is set and deposit button is clicked', async () => {
        // Configure axios mock first
        axios.post.mockResolvedValue({ data: { balance: 2000 } });

        // Then simulate user actions
        fireEvent.click(screen.getAllByText(/Deposit/i)[0]);
        await waitFor(() => screen.getByPlaceholderText(/amount/i));
        fireEvent.change(screen.getByPlaceholderText(/amount/i), { target: { value: '1000' } });
        fireEvent.click(screen.getAllByText(/Deposit/i)[1]);

        // Finally, assert that the balance has been updated
        await waitFor(() => screen.getByText(/\$2000/));
    });

    test('should call withdrawal when amount is set and withdrawal button is clicked', async () => {
        // Configure axios mock first
        axios.post.mockResolvedValue({ data: { balance: 500 } });

        // Then simulate user actions
        fireEvent.click(screen.getAllByText(/Withdrawal/i)[0]);
        await waitFor(() => screen.getByPlaceholderText(/amount/i));
        fireEvent.change(screen.getByPlaceholderText(/amount/i), { target: { value: '500' } });
        fireEvent.click(screen.getAllByText(/Withdrawal/i)[1]);

        // Finally, assert that the balance has been updated
        await waitFor(() => screen.getByText(/\$500/));
    });



    test('should handle error when depositing', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        axios.post.mockRejectedValueOnce(new Error());

        render(
            <RecoilRoot>
                <AccountBalance />
            </RecoilRoot>
        );

        const depositButtons = screen.getAllByRole('button', { name: /Deposit/i });
        fireEvent.click(depositButtons[0]);
        await waitFor(() => screen.getByPlaceholderText(/amount/i));
        fireEvent.change(screen.getByPlaceholderText(/amount/i), { target: { value: '1000' } });
        fireEvent.click(depositButtons[1]);

        await waitFor(() => expect(alertSpy).toHaveBeenCalled());
        expect(alertSpy).toHaveBeenCalledWith("cuenta no encontrada");
    });

    test('should handle error when withdrawing', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        axios.post.mockRejectedValueOnce(new Error());

        render(
            <RecoilRoot>
                <AccountBalance />
            </RecoilRoot>
        );

        const withdrawalButtons = screen.getAllByRole('button', { name: /Withdrawal/i });
        fireEvent.click(withdrawalButtons[0]);
        await waitFor(() => screen.getByPlaceholderText(/amount/i));
        fireEvent.change(screen.getByPlaceholderText(/amount/i), { target: { value: '500' } });
        fireEvent.click(withdrawalButtons[1]);

        await waitFor(() => expect(alertSpy).toHaveBeenCalled());
        expect(alertSpy).toHaveBeenCalledWith("cuenta no encontrada");
    });





});
