import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    // pipe의 일종
    description: string
}

