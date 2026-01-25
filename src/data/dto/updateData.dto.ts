import { IsString, Length } from "class-validator";

export class UpdateDataDto {
    @IsString()
    @Length(2, 3)
    name: string;
    @IsString()
    country: string;
    @IsString()
    continent: string;
    @IsString()
    isSeekingFunding: string;
}