import _ from 'the-lodash';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { CodeControl, InnerPage, PageHeader, PageLink } from '@kubevious/ui-components';

import { useSearchQuery, useService } from '@kubevious/ui-framework';
import { ValidatorID, ValidatorSetting, VALIDATORS_METADATA } from '@kubevious/entity-meta';

import { IValidatorConfigService } from '@kubevious/ui-middleware';
import { ValidatorItem } from '@kubevious/ui-middleware/dist/services/validator-config';

import { VALIDATORS_PAGE } from '../metadata/page';
import { ValidatorSettingControl } from '../components/ValidatorSettingControl';

import styles from './styles.module.css';

export const ValidatorDetailsPage = () => {

    const validatorId : ValidatorID | null = useSearchQuery('validator') as ValidatorID;
    const [validatorItem, setValidatorItem] = useState<ValidatorItem | null>(null);

    const service = useService<IValidatorConfigService>({ kind: 'validator' }, 
        (svc) => {
            if (!validatorId) {
                return;
            }

            svc.getValidator(validatorId)
                .then(result => {
                    setValidatorItem(result);
                })

        });


    if (!validatorId) {
        return <Redirect to={VALIDATORS_PAGE} />;
    }

    const docs = VALIDATORS_METADATA.getValidatorDocs(validatorId);

    const handleValidatorChange = (setting: ValidatorSetting)=> {
        service!.updateValidator({
            validator: validatorId,
            setting: setting,
        });
        validatorItem!.setting = setting;
        setValidatorItem(validatorItem);
    };

    return (
        <InnerPage
            midNarrow
            header={
                <PageHeader title={`Validator ${validatorId}`}>
                </PageHeader>
            }
        >
            <div className={styles.content}>
                
                <div>
                    <PageLink name="Back to Validators"
                            path={VALIDATORS_PAGE}
                            />
                </div>

                {validatorItem && 
                    <div>
                        <ValidatorSettingControl validator={docs}
                                                 setting={validatorItem.setting}
                                                 onSelectionChange={handleValidatorChange}
                                                 />
                    </div>
                }

                <div>
                    {docs.description}
                </div>

                {docs.affected && docs.affected.length > 0 && <div>
                    <span className={styles.subtitle}>
                    Affected Resources:
                    </span>  {docs.affected.join(", ")}
                </div>}

                {docs.examples && docs.examples.length > 0 && <div>
                    <div className={styles.subtitle}>
                        {(docs.examples.length > 1) ? "Examples" : "Example"}
                    </div>

                    <div className={styles.examplesContainer}>
                        {docs.examples.map((x, index) => 
                            <CodeControl key={index}
                                         syntax={x.language}
                                         value={x.script}
                                         showCopyButton
                                        />  
                        )}
                    </div>
  
                </div>}


                {docs.resolutions && docs.resolutions.length > 0 && <div>
                    <div className={styles.subtitle}>
                        Resolution
                    </div>

                    {docs.resolutions.map((x, index) => 
                        <li key={index}>
                            {x}
                        </li>
                    )}
                </div>}

                {docs.resolutionExamples && docs.resolutionExamples.length > 0 && <div>
                    <div className={styles.subtitle}>
                        {(docs.resolutionExamples.length > 1) ? "Resolution Examples" : "Resolution Example"}
                    </div>

                    <div className={styles.examplesContainer}>
                        {docs.resolutionExamples.map((x, index) => 
                            <CodeControl key={index}
                                         syntax={x.language}
                                         value={x.script}
                                         showCopyButton
                                        />  
                        )}
                    </div>
  
                </div>}                

                {docs.externalLinks && docs.externalLinks.length > 0 && <div>
                    <div className={styles.subtitle}>
                        Learn More
                    </div>

                    {docs.externalLinks.map((link, index) => 
                        <li key={index}>
                            <PageLink 
                                    name={link}
                                    path={link}
                                    target="_blank"
                                    />
                        </li>
                    )}
                </div>}

            </div>
                    
        </InnerPage>
    );
};
