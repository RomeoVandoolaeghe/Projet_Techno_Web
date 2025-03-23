import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { DatabaseModule } from '../modules/database/database.module';  // Importer le module contenant PrismaService
import { AuthorsController } from './authors.controller';


@Module({
  imports: [DatabaseModule],  // Ajout du module contenant PrismaService
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
