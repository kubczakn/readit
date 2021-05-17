import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

// CRUD using MirkoORM and Graphql

@Resolver()
export class PostResolver {
    // Query for retrieving data
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        // Find returns a promise with the posts
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id') id: number, 
        @Ctx() { em }: MyContext):  
        Promise<Post | null> {
        // Find returns a promise with a single post, 
        // specified by the post id
        return em.findOne(Post, { id });
    }

    // Mutation for inserting, updating, deleting
    // Create query 
    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string, 
        @Ctx() { em }: MyContext):  
        Promise<Post> {
        const post = em.create(Post, {title})
        await em.persistAndFlush(post);
        return post;
    }

    // Update post
    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id') id: number, 
        @Arg('title', () => String, { nullable: true }) title: string, 
        @Ctx() { em }: MyContext):  
        Promise<Post | null> {
        const post = await em.findOne(Post, { id });
        if (!post) {
            return null;
        }
        if (typeof title !== 'undefined') {
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post;
    }

    // Delete a post
    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id') id: number, 
        @Ctx() { em }: MyContext):  
        Promise<boolean> {
        await em.nativeDelete(Post, { id });
        return true;
    }

}