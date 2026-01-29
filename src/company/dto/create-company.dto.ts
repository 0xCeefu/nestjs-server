import { IsBoolean, isBoolean, isString, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    name: string;

    @IsString()
    industry: string;

    @IsString()
    country: string;

    @IsBoolean()
    isSeekingFunding: boolean;
}
