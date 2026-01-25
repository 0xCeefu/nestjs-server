import { IsBoolean, IsString, Length } from "class-validator";

export class CreateDataDto {
    @IsString()
    @Length(3, 10, {groups: ['create']})
    @Length(2, 3, {groups: ['update']})
    name: string;
    @IsString()
    country: string;
    @IsString()
    continent: string;
    @IsBoolean({groups: ['create']})
    @IsString({groups: ['update']})
    isSeekingFunding: boolean;
}