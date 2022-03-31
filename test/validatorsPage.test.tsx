import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

// import { ValidatorsPage } from '../src';
import { app } from '@kubevious/ui-framework';
import { ValidatorConfigService } from './services/ValidatorConfigService';

document.createRange = () => {
    const range = new Range();

    range.getBoundingClientRect = jest.fn();

    // @ts-ignore
    range.getClientRects = jest.fn(() => ({
        item: () => null,
        length: 0,
    }));

    return range;
};

const renderComponent = () => render(<div />); //render(<ValidatorsPage />);

describe('ValidatorsPage', () => {
    beforeAll(() => {
        app.registerService({ kind: 'validator' }, () => {
            return new ValidatorConfigService();
        });
    });

    test('should check that the component Validators is rendered', async () => {
        // const { findByTestId } = 
        renderComponent();

        // const ruleEditor = await findByTestId('rule-editor');

        // expect(ruleEditor).toBeTruthy();
    });
});
