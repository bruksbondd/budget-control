import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsOptional()
    user?: User
}
