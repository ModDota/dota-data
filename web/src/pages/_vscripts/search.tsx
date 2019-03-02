import { Member } from 'dota-data/files/vscripts/api';
import { EnumMember } from 'dota-data/files/vscripts/enums';
import { getFuncDeepTypes } from 'dota-data/lib/helpers/vscripts';
import qs from 'querystring';
import { Router } from '~utils/hooks';
import { isNotNil } from '~utils/types';
import { TopLevelElement } from './data';

export const setSearchQuery = (query: string) => {
  if (query === '') {
    const historyState = history.state.options;
    const url = (historyState && historyState.beforeSearchUrl) || Router.pathname;
    const asPath = (historyState && historyState.beforeSearchAs) || Router.pathname;
    // tslint:disable-next-line no-floating-promises
    Router.push(url, asPath);
  } else {
    // tslint:disable-next-line no-floating-promises
    Router.push(`/vscripts?search=${encodeURIComponent(query)}`, undefined, {
      beforeSearchUrl:
        (history.state.options && history.state.options.beforeSearchUrl) ||
        `${Router.pathname}?${qs.stringify(Router.query)}`,
      beforeSearchAs:
        (history.state.options && history.state.options.beforeSearchAs) || Router.asPath || '',
    });
  }
};

export const doSearch = (data: TopLevelElement[], words: string[]) => {
  const typeWords = words.filter(x => x.startsWith('type:')).map(x => x.replace(/^type:/, ''));
  const normalWords = words.filter(x => !x.startsWith('type:'));

  const filterMember = (member: Member | EnumMember): boolean => {
    const name = member.name.toLowerCase();
    return normalWords.length > 0 && normalWords.every(word => name.includes(word));
  };

  data = data
    .map(declaration => {
      if (declaration.kind === 'class' || declaration.kind === 'enum') {
        const element =
          declaration.kind === 'class'
            ? {
                ...declaration,
                members: declaration.members.filter(member => {
                  if (filterMember(member)) return true;

                  if (typeWords.length === 0) return false;
                  const memberTypes = (member.kind === 'function'
                    ? getFuncDeepTypes(member)
                    : member.types
                  ).map(type => type.toLowerCase());
                  return typeWords.every(type => memberTypes.some(x => x.includes(type)));
                }),
              }
            : { ...declaration, members: declaration.members.filter(filterMember) };
        if (element.members.length > 0) return element;
      }

      const includeAsType =
        (normalWords.length > 0 &&
          normalWords.every(word => declaration.name.toLowerCase().includes(word))) ||
        (declaration.kind === 'class' &&
          declaration.extend &&
          typeWords.includes(declaration.extend.toLowerCase()));
      if (includeAsType) {
        const element = { ...declaration };
        if (element.kind === 'class' || element.kind === 'enum') element.members = [];
        return element;
      }
    })
    .filter(isNotNil);

  return data;
};
