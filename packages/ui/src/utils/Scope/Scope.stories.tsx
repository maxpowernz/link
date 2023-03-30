import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { z } from 'zod';

import { FormProviderWrapper } from '../../providers/FormProviderWrapper';
import Scope from './Scope';
import { RadioGroupWidget } from '../../components/form-widgets/RadioGroup/RadioGroupWidget';
import TextInputWidget from "../../components/form-widgets/TextInput/TextInputWidget";
import { DropdownWidget } from '../../components/form-widgets/Dropdown/DropdownWidget';
import { TextareaWidget } from '../../components/form-widgets/Textarea/TextareaWidget';

export default {
  title: 'util/Scope',
  component: Scope,
  args: {
    highlight: true,
  },
  parameters: {
    controls: {
      include: ['highlight'],
    },
  },
} as ComponentMeta<typeof Scope>;

const schema = z.object({
  contactType: z.string().min(1, { message: 'Required' }),
  contactTypeOther: z.string().min(1, { message: 'Required' }),
  contactTypeDesc: z.string().min(1, { message: 'Required' }),
  accountType: z.string().min(1, { message: 'Required' }),
  accountTypeList: z.string().optional(),
  accountTypeOther: z.string().min(1, { message: 'Required' }),
  houseYear: z.string().refine((val) => val.length === 0 || !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
  oldHouseDesc: z.string().optional(),
  newHouseDecade: z.string().min(1, { message: 'Required' }),
  hasDamage: z.string().min(1, { message: 'Required' }),
  hazard: z.string().min(1, { message: 'Required' }),
  hazardNumOccurrences: z
    .string()
    .min(1, { message: 'Required' })
    .refine((val) => val.length === 0 || !Number.isNaN(parseInt(val, 10)), {
      message: 'Expected number, received a string',
    }),
  hazardDetails: z.string().min(1, { message: 'Required' }),
  eqc: z.string().min(1, { message: 'Required' }),
  eqcDetails: z.string().min(1, { message: 'Required' }),
  eqcDamageType: z.string().min(1, { message: 'Required' }),
});

export type FormValues = z.infer<typeof schema>;

const onSubmit = (data: FormValues) => console.log('Submit:', data);

const accountTypes = [
  { id: 'person', label: 'Person', value: 'person' },
  { id: 'collective', label: 'Collective', value: 'col' },
  { id: 'trust', label: 'Trust', value: 'trust' },
  { id: 'partnership', label: 'Partnership', value: 'partnership' },
  { id: 'trader', label: 'Trader', value: 'trader' },
  { id: 'ltd', label: 'Limited Company', value: 'ltd' },
  { id: 'other', label: 'Other >>', value: 'other' },
];

const contactTypes = [
  { label: 'Person', value: 'person' },
  { label: 'Company >>', value: 'company' },
  { label: 'Other', value: 'other' },
  { label: 'None', value: 'none' },
];

const eqcDamageTypes = ['Cosmetic', 'Impact', 'Structural'];

/** This will expand a text input widget when 'Other >>' is selected */
export const SimpleVisibility: ComponentStory<typeof Scope> = ({ highlight }) => {
  return (
    <>
      <ul className="font-semibold text-amber-600 p-4">
        <li>Text field opens when Other &gt;&gt; is selected</li>
      </ul>
      <FormProviderWrapper model={{ schema }} uid={1} onSubmit={onSubmit} mode="onTouched">
        <Scope highlight={highlight}>
          <Scope.Source>
            <RadioGroupWidget name="accountType" question="Account type" options={accountTypes} cols={3} size={10} required />
          </Scope.Source>
          <Scope.Target condition="other">
            <TextInputWidget name="accountTypeOther" question="Please specify account type" size={10} required />
          </Scope.Target>
        </Scope>
      </FormProviderWrapper>
    </>
  );
};

export const MultiChildQuestions: ComponentStory<typeof Scope> = ({ highlight }) => {
  return (
    <>
      <ul className="font-semibold text-amber-600 p-4">
        <li>1. Yes opens 2 child questions</li>
        <li className="pl-4">1.1. Hazard question: Yes opens its children</li>
        <li className="pl-4">1.2. EQC question: Yes opens its children</li>
      </ul>
      <FormProviderWrapper model={{ schema }} uid={1} onSubmit={onSubmit} mode="onTouched">
        <Scope highlight={highlight}>
          <Scope.Source>
            <RadioGroupWidget name="hasDamage" question="Location has had natural hazard or eqc" required />
          </Scope.Source>
          <Scope.Target condition="true">
            <Scope>
              <Scope.Source>
                <RadioGroupWidget name="hazard" question="Natural Hazard on Cert. of Title" required />
              </Scope.Source>
              <Scope.Target condition="true">
                <TextInputWidget name="hazardNumOccurrences" question="Number of times" size={4} required />
                <TextareaWidget name="hazardDetails" question="Details" size={10} required />
              </Scope.Target>
            </Scope>
            <Scope>
              <Scope.Source>
                <RadioGroupWidget name="eqc" question="EQC Claims" required />
              </Scope.Source>
              <Scope.Target condition="true">
                <TextareaWidget name="eqcDetails" question="Details" size={10} required />
                <DropdownWidget name="eqcDamageType" question="Damage type" options={eqcDamageTypes} required />
              </Scope.Target>
            </Scope>
          </Scope.Target>
        </Scope>
      </FormProviderWrapper>
    </>
  );
};
MultiChildQuestions.args = {};

export const SimpleVisibilityRange: ComponentStory<typeof Scope> = ({ highlight }) => {
  return (
    <>
      <ul className="font-semibold text-amber-600 list-decimal p-4">
        <li>2000 &lt;= Combobox opens</li>
        <li>2000 &gt; Text field opens</li>
      </ul>
      <FormProviderWrapper model={{ schema }} uid={1} onSubmit={onSubmit} mode="onTouched">
        <Scope highlight={highlight}>
          <Scope.Source>
            <TextInputWidget name="houseYear" question="Year house built" size={4} required />
          </Scope.Source>
          <Scope.Target condition={(year) => String(year).length === 4 && Number(year) < 2000}>
            <TextInputWidget name="oldHouseDesc" question="Please describe the condition" size={10} />
          </Scope.Target>
          <Scope.Target condition={(year) => String(year).length === 4 && Number(year) >= 2000}>
            <DropdownWidget
              noOptionsMessage={() => <>No available data</>}
              name="newHouseDecade"
              question="Decade house built"
              options={['2000', '2010', '2020']}
              size={4}
              required
            />
          </Scope.Target>
        </Scope>
      </FormProviderWrapper>
    </>
  );
};
SimpleVisibilityRange.args = {};

export const SimpleFilter: ComponentStory<typeof Scope> = ({ highlight }) => {
  const simpleDataFilter = [
    { label: 'Person', value: 'person' },
    { label: 'Company', value: 'company' },
  ];

  return (
    <>
      <ul className="font-semibold text-amber-600 list-decimal p-4">
        <li>Person: only the Person type is available</li>
        <li>Company: other types of accounts are available</li>
      </ul>
      <FormProviderWrapper model={{ schema }} uid={1} onSubmit={onSubmit} mode="onTouched">
        <Scope highlight={highlight}>
          <Scope.Source>
            <RadioGroupWidget name="contactType" question="Contact type" options={simpleDataFilter} size={10} required />
          </Scope.Source>
          <Scope.Target
            values={{
              person: accountTypes.filter((type) => type.value === 'person'),
              company: accountTypes.filter((type) => type.value !== 'person' && type.value !== 'other'),
            }}
          >
            <DropdownWidget noOptionsMessage={() => <>No available data</>} name="accountTypeList" question="Account type" size={6} />
          </Scope.Target>
        </Scope>
      </FormProviderWrapper>
    </>
  );
};
SimpleFilter.args = {
  highlight: false,
};

export const NestedSingle: ComponentStory<typeof Scope> = ({ highlight }) => {
  return (
    <>
      <ul className="font-semibold text-amber-600 p-4">
        <li>1. Company &gt;&gt; opens Accoupt type selection</li>
        <li className="pl-4">1.1. Other &gt;&gt; opens a Text field</li>
      </ul>
      <FormProviderWrapper model={{ schema }} uid={1} onSubmit={onSubmit} mode="onTouched">
        <Scope highlight={highlight}>
          <Scope.Source>
            <RadioGroupWidget
              name="contactType"
              question="Contact type"
              options={contactTypes.filter((type) => type.value === 'person' || type.value === 'company')}
              cols={3}
              size={10}
              required
            />
          </Scope.Source>
          <Scope.Target condition={(val) => val != null && val === 'company'}>
            <Scope>
              <Scope.Source>
                <RadioGroupWidget
                  name="accountType"
                  question="Account type"
                  options={accountTypes.filter((type) => type.value !== 'person')}
                  cols={3}
                  size={10}
                  required
                />
              </Scope.Source>
              <Scope.Target condition="other">
                <TextInputWidget name="accountTypeOther" question="Please specify account type" size={11} required />
              </Scope.Target>
            </Scope>
          </Scope.Target>
        </Scope>
      </FormProviderWrapper>
    </>
  );
};
NestedSingle.args = {};

export const NestedMulti: ComponentStory<typeof Scope> = ({ highlight }) => {
  const multiNestedContactTypes = [
    { label: 'Person >>', value: 'person' },
    { label: 'Company >>', value: 'company' },
    { label: 'Other >>', value: 'other' },
    { label: 'None', value: 'none' },
  ];

  return (
    <>
      <ul className="font-semibold text-amber-600 p-4">
        <li>1. Person &gt;&gt; opens Accoupt type selection containing respective data</li>
        <li>2. Company &gt;&gt; opens Accoupt type selection containing respective data</li>
        <li className="pl-4">2.1. Other &gt;&gt; opens a Text field</li>
        <li>3. Other &gt;&gt; opens a Text field and a Textarea</li>
      </ul>
      <FormProviderWrapper model={{ schema }} uid={1} onSubmit={onSubmit} mode="onTouched">
        <Scope highlight={highlight}>
          <Scope.Source>
            <RadioGroupWidget name="contactType" question="Contact type" options={multiNestedContactTypes} cols={3} size={11} required />
          </Scope.Source>
          <Scope.Target
            condition={(val) => val != null && val !== 'other' && val !== 'none'}
            values={{
              person: accountTypes.filter((type) => type.value === 'person'),
              company: accountTypes.filter((type) => type.value !== 'person'),
            }}
          >
            <Scope>
              <Scope.Source>
                <RadioGroupWidget name="accountType" question="Account type" options={accountTypes} cols={3} size={10} required />
              </Scope.Source>
              <Scope.Target condition="other">
                <TextInputWidget name="accountTypeOther" question="Please specify account type" size={11} required />
              </Scope.Target>
            </Scope>
          </Scope.Target>
          <Scope.Target condition="other">
            <TextInputWidget name="contactTypeOther" question="Please specify contact type" size={11} required />
            <TextareaWidget
              name="contactTypeDesc"
              question="Description"
              size={11}
              required
              placeholder="Please describe the above specified contact type"
            />
          </Scope.Target>
        </Scope>
      </FormProviderWrapper>
    </>
  );
};
NestedMulti.args = {};

export const NestedMultiDepth3: ComponentStory<typeof Scope> = ({ highlight }) => {
  return (
    <>
      <ul className="font-semibold text-amber-600 p-4">
        <li>1. Person &gt;&gt; opens Accoupt type selection containing respective data</li>
        <li>2. Company &gt;&gt; opens Accoupt type selection containing respective data</li>
        <li className="pl-4">2.1. Other &gt;&gt; opens a Text field</li>
        <li className="pl-8">2.1.1 Other type 1 opens a Text field</li>
        <li className="pl-8">2.1.2 Other type 2 opens a Text field</li>
        <li className="pl-8">2.1.3 Other type 3 opens a Text field</li>
      </ul>
      <FormProviderWrapper model={{ schema }} uid={1} onSubmit={onSubmit} mode="onTouched">
        <Scope highlight={highlight}>
          <Scope.Source>
            <RadioGroupWidget
              name="contactType"
              question="Contact type"
              options={contactTypes.filter((type) => type.value === 'person' || type.value === 'company')}
              cols={3}
              size={10}
              required
            />
          </Scope.Source>
          <Scope.Target condition={(val) => val != null && val === 'company'}>
            <Scope>
              <Scope.Source>
                <RadioGroupWidget
                  name="accountType"
                  question="Account type"
                  options={accountTypes.filter((type) => type.value !== 'person')}
                  cols={3}
                  size={10}
                  required
                />
              </Scope.Source>
              <Scope.Target condition="other">
                <Scope>
                  <Scope.Source>
                    <RadioGroupWidget
                      name="otherTypes"
                      question="Other types"
                      options={['Other type 1', 'Other type 2', 'Other type 3']}
                      cols={3}
                      size={10}
                      required
                    />
                  </Scope.Source>
                  <Scope.Target condition="Other type 1">
                    <TextInputWidget name="otherType1" question="Other type 1 description" size={4} required />
                  </Scope.Target>
                  <Scope.Target condition="Other type 2">
                    <TextInputWidget name="otherType2" question="Other type 2 description" size={8} required />
                  </Scope.Target>
                  <Scope.Target condition="Other type 3">
                    <TextInputWidget name="otherType3" question="Other type 3 description" size={12} required />
                  </Scope.Target>
                </Scope>
              </Scope.Target>
            </Scope>
          </Scope.Target>
        </Scope>
      </FormProviderWrapper>
    </>
  );
};
NestedMultiDepth3.args = {};
