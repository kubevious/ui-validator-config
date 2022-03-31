import _ from 'the-lodash';
import { Promise } from 'the-promise';

import {
    IValidatorConfigService,
    ValidatorIdBody,
    ValidatorItem
} from '@kubevious/ui-middleware/dist/services/validator-config';

import { ValidatorID, ValidatorSetting, ValidationConfig, DEFAULT_VALIDATION_CONFIG } from '@kubevious/entity-meta'


export class ValidatorConfigService implements IValidatorConfigService {

    getValidators() : Promise<ValidationConfig>
    {
        return Promise.resolve(DEFAULT_VALIDATION_CONFIG);
    }

    getValidator(validatorId: ValidatorID) : Promise<ValidatorItem>
    {
        const item : ValidatorItem = {
            validator: validatorId,
            setting: DEFAULT_VALIDATION_CONFIG[validatorId]
        }
        return Promise.resolve(item);
    }

    updateValidator(item: ValidatorItem) : Promise<void>
    {
        return Promise.resolve();
    }

    close()
    {

    }
}
