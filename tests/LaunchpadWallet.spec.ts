import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { LaunchpadWallet } from '../wrappers/LaunchpadWallet';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('LaunchpadWallet', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LaunchpadWallet');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let launchpadWallet: SandboxContract<LaunchpadWallet>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        launchpadWallet = blockchain.openContract(LaunchpadWallet.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await launchpadWallet.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: launchpadWallet.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and launchpadWallet are ready to use
    });
});
