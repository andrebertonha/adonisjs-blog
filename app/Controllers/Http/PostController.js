'use strict'

const Post = use('App/Models/Post')

class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const user = await auth.getUser()

    if (await user.can('read_private_post')) {
      const posts = await Post.query().with('user').fetch()
      return posts
    }

    const posts = await Post.query().where({ type: 'public' }).fetch()
    return posts
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(['title', 'body'])

    const post = Post.create({ ...data, user_id: auth.user.id })

    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)

    if (post.type === 'public') {
      return post
    }

    const user = await auth.getUser()

    if (await user.can('read_private_post')) { return post }

    return response.status(400).send({
      error: {
        message: 'Você não tem permissão de leitura'
      }
    })
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title', 'body'])

    post.merge(data)
    await post.save()

    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}

module.exports = PostController
