import { IsBoolean, IsString, Length } from "class-validator";

export class CreateDataDto {
    @IsString()
    @Length(3, 10)
    name: string;

    @IsString()
    country: string;

    @IsString()
    continent: string;

    @IsBoolean()
    isSeekingFunding: boolean;
}