import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Client, DatabaseAPI, Discussion } from 'dsteem';
import { updatePosts, clearPost } from '../../Redux/Actions/postActions';
import { AppState } from '../../Redux/Reducers';

import Home from '../Home';
import Portfolio from '../Portfolio';
import Feed from '../Feed';
import About from '../About';
import Post from '../Post';
import ScrollToTop from './ScrollToTop';
import { GitRepoInterface, GitDirInterface } from '../Portfolio/Portfolio';
import { updateRepo } from '../../Redux/Actions/portfolioActions';

import './App.css';

interface AppProps {
  posts: Discussion[];
  repos: GitRepoInterface[];
  updatePosts: typeof updatePosts;
  clearPost: typeof clearPost;
  updateRepo: typeof updateRepo;
}

const mapStateToProps = (state: AppState) => ({
  posts: state.Post.posts,
  repos: state.Portfolio.repos
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePosts: (newPosts: Discussion[]) => dispatch(updatePosts(newPosts)),
  clearPost: (key: string) => dispatch(clearPost(key)),
  updateRepo: (repo: GitRepoInterface) => dispatch(updateRepo(repo))
});

class App extends React.Component<AppProps> {
  private steemClient: Client;
  private dbAPI: DatabaseAPI;

  constructor(props: AppProps) {
    super(props);

    this.steemClient = new Client('https://api.steemit.com');
    this.dbAPI = new DatabaseAPI(this.steemClient);
  }

  public shouldComponentUpdate() {
    return false;
  }

  public componentDidMount() {
    this.dbAPI
      .getDiscussions('blog', {
        tag: 'petertag',
        limit: 100
      })
      .then(posts => {
        const noActifitPosts = posts.filter(
          post => post.category !== 'actifit' && post.author === 'petertag'
        );
        this.props.updatePosts(noActifitPosts);
      })
      .catch(error => alert(error));

    for (const repo of this.props.repos) {
      fetch(
        'https://api.github.com/repos/gitschwifty/' + repo.url + '/contents'
      )
        .then(response => {
          if (response.status !== 403) {
            response
              .json()
              .then(data => {
                for (const file of data) {
                  if (file.type === 'dir' || file.type === 'tree') {
                    if (file.path !== 'public' || repo.url !== 'pjtaggart') {
                      repo.topDirs.push({
                        sha: file.sha,
                        path: file.path,
                        git_url: file.git_url,
                        dirs: [],
                        files: []
                      });
                    }
                  } else {
                    repo.topFiles.push({
                      sha: file.sha,
                      path: file.path,
                      type: file.type,
                      git_url: file.git_url
                    });
                  }
                }

                this.props.updateRepo(repo);
              })
              .catch(error => alert(error));
          }
        })
        .catch(error => alert(error));
    }
  }

  public render() {
    return (
      <div id='app_container'>
        <BrowserRouter>
          <ScrollToTop>
            <Route exact path='/' component={Home} />
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/feed' component={Feed} />
            <Route path='/about' component={About} />
            <Route path='/post/:permlink' component={Post} />
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
