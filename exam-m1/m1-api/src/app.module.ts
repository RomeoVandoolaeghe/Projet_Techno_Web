import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [DatabaseModule, AuthorsModule, BooksModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
