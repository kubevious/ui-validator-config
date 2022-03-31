import _ from 'the-lodash';
import React, { FC, Fragment } from 'react';

import styles from './styles.module.css';

import { ValidatorSettingControl } from '../ValidatorSettingControl';
import { ValidatorCategoryMetaData,
         ValidationConfig,
         ValidatorID,
         ValidatorSetting } from '@kubevious/entity-meta';

export interface ValidatorCategoryProps {
    categoryMeta: ValidatorCategoryMetaData,
    validationConfig: ValidationConfig,
    onSelectionChange?: (validatorId: ValidatorID, setting: ValidatorSetting) => any
}
export const ValidatorCategoryControl : FC<ValidatorCategoryProps> = (
    {
        categoryMeta,
        validationConfig,
        onSelectionChange
}) => {

    return (
        <div className={styles.categoryWrapper}>

            <div className={styles.categoryName}>
                {categoryMeta.category}
            </div>

            {<div className={styles.validators}>
            
                {categoryMeta.validators.map((validator, index) => (
                    <Fragment key={index}>
                        <ValidatorSettingControl addDetailsLink
                                                 validator={validator} 
                                                 setting={validationConfig[validator.validatorId] ?? ValidatorSetting.off}
                                                 onSelectionChange={(setting) => {
                                                    if (onSelectionChange) {
                                                        onSelectionChange(validator.validatorId, setting);
                                                    }
                                                 }}
                                                />

                        {(index !== validator.validatorId.length - 1) && 
                            <div className={styles.separator}>
                            </div>
                        }

                    </Fragment>
                ))}
                
            </div>}
        </div>
    );
    
};