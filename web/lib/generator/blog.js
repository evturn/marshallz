import axios from 'axios'
import firebase from 'firebase'
import { api } from '../generator'

const blog = async ({ author, gen }) => {
    const subject = gen.run();
    const source = await requestImage(subject);
    return await savePost({
      ...bodyProp(gen.take(5)),
      ...mediaProps(source),
      ...metaProps(author),
      ...titleProps(subject),
    });
};

const requestImage = async text => {
  const query = text.split(' ').join('+');
  const route = 'api.giphy.com/v1/gifs/random';
  const params = `api_key=dc6zaTOxFJmzC&tag=${query}`;
  const res = await axios(`http://${route}?${params}`);
  return res.data.data.image_url;
};

const savePost = async post => {
  return await api
    .database()
    .ref()
    .child('posts')
    .push(post);
};

const bodyProp = text => ({
  body: text,
});

const mediaProps = url => ({
  image_url: url,
});

const metaProps = author => ({
  author, 
  timestamp: firebase.database.ServerValue.TIMESTAMP,
});

const titleProps = text => ({
  slug: toSlug(text), 
  title: text, 
});

const toSlug = text => {
  return text.trim()
    .replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase();
};

export default blog;
