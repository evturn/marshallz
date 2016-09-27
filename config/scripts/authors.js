export default [
  {
    _id: '57bd35cf84cf8c87e3a01f61',
    name: 'Marshall',
    username: 'marshall',
    content: 'content/01.txt',
    avatar_img: '01-avatar.png',
    profile_img: '01-profile.png',
    posts: [
      '571c28a0474ad33e380c90f9',
      '57171ae0b7ea5c07222205ae',
      '571c0c81f2b687c0342203e8'
    ],
    blog: {
      url: '/authors/marshall',
      cronjob: '00 00 01,06,11,17,22 * * *',
    },
    twitter: {
      url: 'https://twitter.com/marshallzBlog',
      cronjob: '00 00 08,22 * * *',
      keys: {
        consumer_key: process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
        token_key: process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
        token_secret: process.env.MARSHALLZ_TWITTER_TOKEN_SECRET,
      },
    }
  },{
    _id: '57bd35cf84cf8c87e3a01f63',
    name: 'Clang',
    username: 'clang',
    content: 'content/02.txt',
    avatar_img: '02-avatar.png',
    profile_img: '02-profile.png',
    posts: [
      '571711d7e85951a92053ef65',
      '571780d485781e1d2e1a70fc'
    ],
    blog: {
      url: '/authors/clang',
      cronjob: '00 00 00,09,14,20,23 * * *',
    },
    twitter: {
      url: 'https://twitter.com/__clang__',
      cronjob: '00 00 04,00 * * *',
      keys: {
        consumer_key: process.env.CLANG_TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.CLANG_TWITTER_CONSUMER_SECRET,
        token_key: process.env.CLANG_TWITTER_TOKEN_KEY,
        token_secret: process.env.CLANG_TWITTER_TOKEN_SECRET,
      },
    }
  },{
    _id: '57bd35cf84cf8c87e3a01f62',
    name: 'b0rf',
    username: 'b0rf',
    content: 'content/03.txt',
    avatar_img: '03-avatar.png',
    profile_img: '03-profile.png',
    posts: [
      '571c0033d8983faf3122c6d6',
      '57177f1285781e1d2e1a70fb'
    ],
    blog: {
      url: '/authors/b0rf',
      cronjob: '00 00 02,08,18 * * *',
    }
  }
]
