import _ from 'the-lodash';
import React, { FC } from 'react';
import { Label, PageLink, SeverityIcon } from '@kubevious/ui-components';
import { MultiSwitch, MultiChoiceOption } from '@kubevious/ui-components';

import { ValidatorSetting } from '@kubevious/entity-meta'
import { ValidatorDocs } from '@kubevious/entity-meta/dist/validation/docs/builder';

import styles from './styles.module.css';

import { VALIDATOR_DETAILS_PAGE } from '../../metadata/page';

export interface ValidatorSettingProps {
    validator: ValidatorDocs,
    setting: ValidatorSetting,
    onSelectionChange?: (setting: ValidatorSetting) => any
    addDetailsLink?: boolean
}
export const ValidatorSettingControl : FC<ValidatorSettingProps> = (
    {
        validator,
        setting,
        onSelectionChange,
        addDetailsLink
    }) => {

    const handleValidatorChange = (index: number): void => {
        if (onSelectionChange) {
            onSelectionChange(getMultiSelectionValue(index));
        }
    };

    return (
        <div className={styles.validatorWrapper}>

            <div className={styles.validatorMainRow}>
                <div className={styles.validatorName}>

                    {addDetailsLink && 
                        <PageLink name={validator.title}
                                  textSize="large"
                                  path={VALIDATOR_DETAILS_PAGE}
                                  searchParams={{ validator: validator.validatorId }}
                                />
                    }

                    {!addDetailsLink && 
                        <Label text={validator.title} size="large" />
                    }
                    
                </div>

                <div className={styles.validatorValue}>
                    <MultiSwitch
                        items={VALIDATOR_CHOICE_DATA}
                        initialSelection={getMultiSelectionIndex(setting)}
                        onSelectedChanged={handleValidatorChange}
                        itemWidth={120}
                        />
                </div>
            </div>

        </div>
    );
    
};

const VALIDATOR_CHOICE_DATA : MultiChoiceOption[] = [
    {
        imageUrl: '/img/browser/power.svg',
        label: 'Disabled',
        tooltip: 'Disable validator'
    },
    {
        element: <SeverityIcon severity="error" size={20} />,
        label: 'Error',
        tooltip: 'Raise errors on violations'
    },
    {
        element: <SeverityIcon severity="warn" size={20} />,
        label: 'Warning',
        tooltip: 'Raise warnings on violations'
    }
];


function getMultiSelectionIndex(validator?: ValidatorSetting) : number
{
    switch(validator) 
    {
        case ValidatorSetting.error: return 1;
        case ValidatorSetting.warn: return 2;
        default: return 0;
    }
}

function getMultiSelectionValue(index: number) : ValidatorSetting
{
    switch(index) 
    {
        case 1: return ValidatorSetting.error;
        case 2: return ValidatorSetting.warn;
        default: return ValidatorSetting.off;
    }
}
