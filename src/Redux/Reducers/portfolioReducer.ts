import {
  PortfolioState,
  PortfolioActionType,
  UPDATE_REPO
} from '../Types/portfolioTypes';

const initialState: PortfolioState = {
  repos: [
    {
      name: 'pjtaggartv2',
      title: 'This Website: pjtaggartv2',
      url: 'pjtaggartv2',
      topDirs: [],
      topFiles: [],
      loaded: false
    },
    {
      name: 'pjtaggartv1',
      title: 'The old version of this site: pjtaggartv1',
      url: 'pjtaggart',
      topDirs: [],
      topFiles: [],
      loaded: false
    },
    {
      name: 'pywit',
      title: 'Pywit: A Steem Witness Toolkit built in Python.',
      url: 'pywit',
      topDirs: [],
      topFiles: [],
      loaded: false
    },
    {
      name: 'tcc',
      title: 'Tiny C Compiler: unfinished',
      url: 'TCCompiler',
      topDirs: [],
      topFiles: [],
      loaded: false
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
        repos: state.repos.map(repo =>
          repo.name === action.repo.name ? action.repo : repo
        )
      };
    default:
      return state;
  }
}
