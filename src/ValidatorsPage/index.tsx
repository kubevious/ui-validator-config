import _ from 'the-lodash';
import React, { Fragment, useState } from 'react';
import { InnerPage, PageHeader } from '@kubevious/ui-components';

import { useService } from '@kubevious/ui-framework';
import { VALIDATORS_METADATA,
         ValidatorID,
         ValidatorSetting,
         ValidationConfig } from '@kubevious/entity-meta'

import { IValidatorConfigService } from '@kubevious/ui-middleware';

import { ValidatorCategoryControl } from '../components/ValidatorCategoryControl'

import styles from './styles.module.css';


export const ValidatorsPage = () => {
    const [validationConfig, setValidationConfig] = useState<ValidationConfig | null>(null);

    const service = useService<IValidatorConfigService>({ kind: 'validator' }, 
        (svc) => {

            svc.getValidators()
                .then(result => {
                    setValidationConfig(result);
                });

        });

    const handleValidatorChange = (validator: ValidatorID, setting: ValidatorSetting)=> {
        service!.updateValidator({
            validator: validator,
            setting: setting,
        });
        validationConfig![validator] = setting;
        setValidationConfig(validationConfig);
    };

    return (
        <InnerPage
            midNarrow
            header={
                <PageHeader title="Validators">
                </PageHeader>
            }
        >

            {validationConfig && <div className={styles.validators}>
            
                {VALIDATORS_METADATA.categories.map((categoryMeta, index) => {

                    return <Fragment key={index}>
                        {(categoryMeta.validators.length > 0) &&
                            <ValidatorCategoryControl 
                                    key={index}
                                    categoryMeta={categoryMeta}
                                    validationConfig={validationConfig} 
                                    onSelectionChange={(validator, setting) => {
                                        handleValidatorChange(validator, setting);
                                    }}
                                    />
                        }
                    </Fragment>; 
                })}
                
            </div>}

        </InnerPage>
    );
};
