import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    // @IsNotEmpty 
    // 해당 값이 빈 값인지 아닌지 확인하여 주는 모듈
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string
}