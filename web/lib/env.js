export const b0rf = {
  env: {
    url: process.env.MARHALLZ_SOURCE_URL_2,
  },
};

export const clang ={
  env: {
    content: {
      url: process.env.MARSHALLZ_SOURCE_URL_1,
    },
    twitter: {
      access_token_key: process.env.CLANG_TWITTER_TOKEN_KEY,
      access_token_secret: process.env.CLANG_TWITTER_TOKEN_SECRET,
      consumer_key: process.env.CLANG_TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.CLANG_TWITTER_CONSUMER_SECRET,
    },
  },
};

export const marshall = {
  env: {
    content: {
      url: process.env.MARHALLZ_SOURCE_URL_0,
    },
    twitter: {
      access_token_key: process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
      access_token_secret : process.env.MARSHALLZ_TWITTER_TOKEN_SECRET,
      consumer_key: process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
    },
  },
};

export default {
  b0rf,
  clang,
  marshall,
};
