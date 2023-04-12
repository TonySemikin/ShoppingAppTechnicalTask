import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { configuration } from 'src/aop/config/configuration';
import { ApplicationModule } from '../../application/application.module';
import { ProductResolver } from './v1/public/resolvers/product.resolver';
import { CategoryResolver } from './v1/public/resolvers/category.resolver';

const { API_BASE_URL, API_VERSION } = configuration;

@Module({
  imports: [
    ApplicationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: configuration.GRAPHQL_PLAYGROUND,
      path: `${API_BASE_URL}/${API_VERSION}/graphql-shopping-playground`,
      autoSchemaFile: true,
    }),
  ],
  providers: [ProductResolver, CategoryResolver],
})
export class GraphQLApiModule {}
