import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), 
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService ) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
    inject: [ConfigService]
  })
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
