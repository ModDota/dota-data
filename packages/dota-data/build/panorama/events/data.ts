import { PanoramaEvent } from './types';

export const override = (events: Record<string, PanoramaEvent>) => {
  events.DOTAShowAbilityTooltipForLevel.args[0].name = 'level';
};

export const additions: Record<string, PanoramaEvent> = {
  DismissAllContextMenus: {
    description: '',
    panelEvent: false,
    args: [],
  },

  BrowserGoToURL: {
    description: '',
    panelEvent: false,
    args: [{ name: 'url', type: 'string' }],
  },
  ExternalBrowserGoToURL: {
    description: '',
    panelEvent: false,
    args: [{ name: 'url', type: 'string' }],
  },

  UIHideCustomLayoutTooltip: {
    description: '',
    panelEvent: true,
    args: [{ name: 'name', type: 'string' }],
  },
  UIShowCustomLayoutParametersTooltip: {
    description: '',
    panelEvent: true,
    args: [
      { name: 'name', type: 'string' },
      { name: 'layoutPath', type: 'string' },
      { name: 'parameters', type: 'string' },
    ],
  },

  DOTAHUDGameDisconnect: {
    description: '',
    panelEvent: false,
    args: [],
  },
  DOTAShowMatchDetails: {
    description: '',
    panelEvent: false,
    args: [{ name: 'matchId', type: 'int32' }],
  },
};
