import { Company } from '../entities/company.entity';
import { IsString } from 'class-validator';
export class CreateCompanyDto extends Company {
    @IsString()
    name: string;

    @IsString()
    fantasyName: string;

    @IsString()
    cnpj: string;

    @IsString()
    address: string;
}
