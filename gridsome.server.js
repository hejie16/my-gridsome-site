// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')
const request = axios.create({
  baseURL: "https://api.github.com",
  timeout: 150000
})

const githubUsername = 'GitHub-Laziji'

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const requests = [
      request.get(`/users/${githubUsername}`),
      request.get(`/users/${githubUsername}/followers`),
      request.get(`/users/${githubUsername}/following`),
      request.get(`/users/${githubUsername}/repos`),
      // request.get(`/users/${githubUsername}/gists`)
    ]

    console.log(requests)
    const results = await Promise.all(requests)


    // const { data } = await request.get(`/users/${githubUsername}`)
    const { data: userInfo } = results[0]
    const userInfoCollection = addCollection('UserInfo')
    userInfoCollection.addNode({
      id: userInfo.id,
      login: userInfo.login,
      avatar_url: userInfo.avatar_url,
      location: userInfo.location || '',
    })
    const { data: followers } = results[1]
    const followerCollection = addCollection('Followers')

    for (const follower of followers) {
      followerCollection.addNode(follower)
    }

    const { data: followings } = results[2]
    const followingCollection = addCollection('Followings')

    for (const following of followings) {
      followingCollection.addNode(following)
    }

    const { data: projects } = results[3]
    const projectCollection = addCollection('Project')

    for (const project of projects) {
      projectCollection.addNode(project)
    }

    // const { data: blogs } = results[4]
    // const blogCollection = addCollection('blogs')

    // for (const blog of blogs) {
    //   blogCollection.addNode(blog)
    // }

    // const { data } = await request.get(`/users/${githubUsername}/followers`)
    // const { data } = await request.get(`/users/${githubUsername}/following`)
  })

  // api.loadSource(async actions => {
  //   const { data } = await axios.get('https://api.example.com/posts')

  //   const collection = actions.addCollection({
  //     typeName: 'UserInfo'
  //   })

  //   for (const post of posts) {
  //     collection.addNode({
  //       id: post.id,
  //       title: post.title
  //     })
  //   }
  // })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
