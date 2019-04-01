import {
  PortfolioState,
  PortfolioActionType,
  UPDATE_REPO
} from '../Types/portfolioTypes';
/**
 * {
      name: 'pjtaggartv2',
      title: 'This Website: pjtaggartv2',
      url: 'pjtaggartv2',
      topDirs: [],
      topFiles: []
    },
 */

const initialState: PortfolioState = {
  repos: [
    {
      name: 'pjtaggartv1',
      title: 'The old version of this site: pjtaggartv1',
      url: 'pjtaggart',
      topDirs: [],
      topFiles: []
    },
    {
      name: 'pywit',
      title: 'Pywit: A Steem Witness Toolkit built in Python.',
      url: 'pywit',
      topDirs: [],
      topFiles: []
    },
    {
      name: 'tcc',
      title: 'Tiny C Compiler: unfinished',
      url: 'TCCompiler',
      topDirs: [],
      topFiles: []
    }
  ]
};

export default function portfolioReducer(
  state = initialState,
  action: PortfolioActionType
): PortfolioState {
  switch (action.type) {
    case UPDATE_REPO:
      return {
        repos: [
          ...state.repos.filter(repo => repo.name !== action.repo.name),
          action.repo
        ]
      };
    default:
      return state;
  }
}
