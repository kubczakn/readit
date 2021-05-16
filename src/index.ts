import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { HelloResolver } from "./resolvers/hello";
import { buildSchema } from 'type-graphql';

const main = async () => {
    // Migrations for database schema
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    });

    // Endpoint for our express server
    app.get('/', (_, res) => {
        res.send('Hello')
    });

    // Create graphql endpoint
    apolloServer.applyMiddleware({ app });

    // Start out express server
    app.listen(4000, () => {
        console.log('Server listening on port 4000')
    });
};

main().catch(err => {
    console.log(err);
});
