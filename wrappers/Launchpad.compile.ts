import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'func',
    targets: ['contracts/imports/stdlib.fc', 'contracts/errors.fc', 'contracts/op-codes.fc', 'contracts/params.fc', 'contracts/launchpad-utils.fc', 'contracts/launchpad_wallet.fc'],
};
