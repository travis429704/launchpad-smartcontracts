import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type LaunchpadWalletConfig = {};

export function launchpadWalletConfigToCell(config: LaunchpadWalletConfig): Cell {
    return beginCell().endCell();
}

export class LaunchpadWallet implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LaunchpadWallet(address);
    }

    static createFromConfig(config: LaunchpadWalletConfig, code: Cell, workchain = 0) {
        const data = launchpadWalletConfigToCell(config);
        const init = { code, data };
        return new LaunchpadWallet(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
