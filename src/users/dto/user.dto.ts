import { Expose, Exclude } from "class-transformer";
import { IsUUID, IsString } from "class-validator";

export class User {
    @IsUUID()
    @Expose()
    id: string;

    @IsString()
    @Expose()
    name: string;

    @IsString()
    @Expose()
    email: string;

    @IsString()
    @Exclude()
    password: string;
}
