import React, { Component } from "react";
import AnimateHeight from "react-animate-height";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }

  renderTopics() {
    let topics = this.props.associated_topics.map((topic, index) => {
      return (
        <span className="post-topic" key={index}>
          {topic}
        </span>
      );
    });
    return topics;
  }

  getNameForPostLink(str) {
    var n = str.lastIndexOf("/");
    var reslink = str.substring(n + 1, str.length);

    if (n + 1 == str.length) {
      reslink = str.slice(0, n);
    }

    if (reslink.includes(".html")) {
      reslink = reslink.substring(0, reslink.length - 5);
    }
    if (reslink.includes(".htm")) {
      reslink = reslink.substring(0, reslink.length - 4);
    }

    return reslink;
  }

  renderLinks() {
    let links = this.props.post_links.map((post_link, index) => {
      return (
        <div className="post-link" key={index}>
          <div className="post-link__box"></div>
          <div className="post-link__link">
            <a href={post_link.link_url}>
              {this.getNameForPostLink(post_link.link_url)}
            </a>
          </div>
        </div>
      );
    });
    if (links == 0) {
      return <div className="no-content">No Post Links</div>;
    }
    return links;
  }

  render() {
    if (this.props.type == "recent") {
      return (
        <li className="recent-post">
          <div className="recent-post__title">{this.props.title}</div>
          <div className="recent-post__topics">{this.renderTopics()}</div>
        </li>
      );
    } else if (this.props.type == "result") {
      return (
        <li
          className="result-post"
          onMouseEnter={() => this.setState({ height: 70 })}
          onMouseLeave={() => this.setState({ height: 0 })}
        >
          <div className="result-post__topics">{this.renderTopics()}</div>
          <div className="result-post__title">
            <a href={this.props.url_for_post}>{this.props.title}</a>
          </div>
          <AnimateHeight duration={500} height={this.state.height}>
            <div className="result-post__links">{this.renderLinks()}</div>
          </AnimateHeight>
        </li>
      );
    }
  }
}

export default Post;
