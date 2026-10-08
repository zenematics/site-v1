// Zenderal release stage: 'Alpha' | 'Beta' | 'Release'
export const ZENDERAL_STAGE = 'Alpha';

export const stageLabel = (stage) => stage + (stage === 'Release' ? '' : ' · In testing');
