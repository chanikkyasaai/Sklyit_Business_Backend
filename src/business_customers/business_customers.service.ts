import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './business_customers.entity';
import { Not, Repository } from 'typeorm';
import { CreateBusinessCustomerDto } from './bscustomer.dto';

@Injectable()
export class BusinessCustomersService {
    constructor(
        @InjectRepository(Customers)
        private readonly CustomersRepository: Repository<Customers>,
    ) { }

    async getAllBusinessCustomers(bs_id: string): Promise<Customers[]> {
        return await this.CustomersRepository.find({
            where: { businessClient: { BusinessId: bs_id } },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
    }

    async getBusinessCustomerByID(bs_id: string, cust_id: string): Promise<Customers> {
        if(!bs_id || !cust_id) {
            throw new Error('Business ID and Customer ID are required');
        }
        try{

            return await this.CustomersRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, CustId: cust_id },
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        }
        catch(error) {
            console.log(error);
            throw error;
        }
    }

    async createBusinessCustomer(bs_id: string, createCustomerDto: CreateBusinessCustomerDto): Promise<Customers> {
        const { Name, email, MobileNo, address } = createCustomerDto;
        const exists = await this.CustomersRepository.findOne({
            where: [{ businessClient: { BusinessId: bs_id }, email: email }, { businessClient: { BusinessId: bs_id }, MobileNo: MobileNo }],
            relations: ['businessClient'],
        })
        if(exists) {
            throw new Error('Customer with this email or mobile number already exists');
        }
        const customer = this.CustomersRepository.create({
            ...createCustomerDto,
            businessClient: { BusinessId: bs_id }
        });
        try {
            return await this.CustomersRepository.save(customer);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateBusinessCustomer(bs_id: string, cust_id: string, updateCustomerDto: CreateBusinessCustomerDto): Promise<Customers> {
        const { Name, email, MobileNo, address } = updateCustomerDto;
        // // Check if the new email or mobile number already exists for another customer
        const existingCustomer = await this.CustomersRepository.findOne({
            where: [
                { businessClient: { BusinessId: bs_id }, email: email, CustId: Not(cust_id) },
                { businessClient: { BusinessId: bs_id }, MobileNo: MobileNo, CustId: Not(cust_id) }
            ],
            relations: ['businessClient'],
        });
        if (existingCustomer) {
            throw new Error('Another customer with this email or mobile number already exists');
        }

        const customer = await this.CustomersRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, CustId: cust_id },
            relations: ['businessClient'],
        });
        if (!customer) {
            throw new Error('Customer not found');
        }
        customer.Name = Name || customer.Name;
        customer.email = email || customer.email;
        customer.MobileNo = MobileNo || customer.MobileNo;
        customer.address = address || customer.address;
        try {
            return await this.CustomersRepository.save(customer);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteBusinessCustomer(bs_id: string, cust_id: string): Promise<void> {
        const customer = await this.CustomersRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, CustId: cust_id },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
        if (!customer) {
            throw new Error('Customer not found');
        }
        try {
            await this.CustomersRepository.remove(customer);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
