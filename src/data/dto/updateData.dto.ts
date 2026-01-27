import { PartialType } from "@nestjs/mapped-types";
import { CreateDataDto } from "./createData.dto";

export class UpdateDataDto extends PartialType(CreateDataDto) {}