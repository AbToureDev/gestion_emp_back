import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmployerModule } from './employer/employer.module';
import {typeOrmConfig} from "./orm.config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [AuthModule, EmployerModule,
    TypeOrmModule.forRoot(typeOrmConfig),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
