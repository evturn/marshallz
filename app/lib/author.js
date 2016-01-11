import Statement from './statement';

export default class Author {
  constructor(props) {
    this.name = this.props.name;
    this.username = this.props.username;
    this.filepath = this.props.filepath;
    this.keys = this.props.keys;
    this.social = this.props.social;
    this.jobs = this.props.jobs;
    this.keywords = this.props.keywords;
  }
  write() {
    return new Promise((resolve, reject) => {
      return new Statement({files: this.filepath})
        .start()
        .end()
        .runProcess((err, text) => {
          if (err) { console.log(err); }

          resolve(text);
        });
    });
  }
  postToTwitter() {
    this.write().then((text) => {
      if (text.length > 140) {
        return this.postToTwitter();
      }

      this.keys.twitter.post('statuses/update', { status: text }, (error, tweet, response) => {
        if (error) { return error; }

        console.log(JSON.parse(response.body));
        return tweet;
      });
    })
    .catch((err) => console.log('text', err));
  }
}