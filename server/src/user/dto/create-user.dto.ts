import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength,  } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(6, { message: 'Password mast be more then 6 symbols'})
    password: string;
}
