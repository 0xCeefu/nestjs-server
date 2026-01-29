import { IsString } from "class-validator";

export class CreateFounderDto {
    @IsString()
    name: string;

    @IsString()
    role: string;
}
