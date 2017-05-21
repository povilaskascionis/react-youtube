import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTsearch from 'youtube-api-search';
import SearchBar from './components/Search_bar';
import VideoList from './components/Video_list';
import VideoDetail from './components/Video_detail';
const API_KEY = 'AIzaSyC0JtpE9_9bkr1AMCV2mklUl0zX-Z3BSMk';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("work at wix")
  }

  videoSearch (term) {
    YTsearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  

  render(){
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 600)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
      </div>
    );
  }
}

let container = document.querySelector('.container');
ReactDOM.render(<App />,  container);