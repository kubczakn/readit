import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        // Find returns a promise with the posts
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id', () => Int) id: number, 
        @Ctx() { em }: MyContext):  
        Promise<Post | null> {
        // Find returns a promise with a single post, 
        // specified by the post id
        return em.findOne(Post, { id });
    }

    // Create query 
    // @Query(() => Post, { nullable: true })
    // post(
    //     @Arg('id', () => Int) id: number, 
    //     @Ctx() { em }: MyContext):  
    //     Promise<Post | null> {
    //     // Find returns a promise with a single post, 
    //     // specified by the post id
    //     return  em.findOne(Post, { id });
    // }

}