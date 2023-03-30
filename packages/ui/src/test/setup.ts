import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';
import { randomUUID } from 'node:crypto';
// @ts-ignore
// import matchers from '@testing-library/jest-dom/matchers';
// import { expect } from 'vitest';
// expect.extend(matchers);

// setupFile.js
import { setGlobalConfig } from '@storybook/testing-react';

// Storybook's preview file location
//import * as globalStorybookConfig from "../../../.storybook/preview";

window.crypto.randomUUID = randomUUID;

// Replace with setProjectAnnotations if you are using the new pre-release version the addon
//setGlobalConfig(globalStorybookConfig);
