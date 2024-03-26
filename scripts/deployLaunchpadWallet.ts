import { toNano } from '@ton/core';
import { LaunchpadWallet } from '../wrappers/LaunchpadWallet';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const launchpadWallet = provider.open(LaunchpadWallet.createFromConfig({}, await compile('LaunchpadWallet')));

    await launchpadWallet.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(launchpadWallet.address);

    // run methods on `launchpadWallet`
}
