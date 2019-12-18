import {IsNotEmpty, IsString} from 'class-validator';

export class UsersDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;
}
