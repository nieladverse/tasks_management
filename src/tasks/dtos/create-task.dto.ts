import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsBoolean()
    @IsOptional()
    is_complete?: boolean;
  
    @IsDateString()
    @IsOptional()
    due_date?: string;
  
    @IsEnum(['low', 'medium', 'high'])
    @IsOptional()
    priority?: 'low' | 'medium' | 'high';
  
    @IsString()
    @IsNotEmpty()
    list_id: string;
  }