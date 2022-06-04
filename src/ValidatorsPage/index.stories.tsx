import { app } from '@kubevious/ui-framework';
import { MemoryRouter } from 'react-router-dom';
import { Story } from '@storybook/react';
import React from 'react';
import { ValidatorConfigService } from '../../test/services/ValidatorConfigService';

import { ValidatorsPage } from './';

export default {
    title: 'ValidatorsPage',
    component: ValidatorsPage,
    decorators: [
        (Story: any) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ]
};

export const Default: Story = () => {

    app.registerService({ kind: 'validator' }, () => {
        return new ValidatorConfigService();
    });

    return (
        <div style={{ minHeight: '100vh', maxWidth: '100vw', width: '100vw', height: '100vh' }}>
            <div style={{ background: '#2f3036', height: '100%', width: '100%', position: 'relative' }}>
                
                <ValidatorsPage />
                
            </div>
        </div>
    );
};

