import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Orders } from './bsorders.entity';
import { CreateOrdersDto, UpdateOrdersDto } from './bsorders.dto';


@Injectable()
export class BsordersService {
    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,

    ) { }

    async getAllOrders(bs_id: string): Promise<Orders[]> {
        return await this.ordersRepository.find({
            where: { businessClient: { BusinessId: bs_id } },
            relations: ['businessClient', 'customer'],
        }
        );
    }

    async getOrderById(bs_id: string, Oid: string): Promise<Orders> {
        try {
            return await this.ordersRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, Oid: Oid },
                relations: ['businessClient', 'customer'],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createOrder(bs_id: string, createOrderDto: CreateOrdersDto): Promise<Orders> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }
        const { custid, services, products } = createOrderDto;
        try {
            const order = this.ordersRepository.create({
                Services: services,
                Products: products,
                customer: { CustId: custid },
                businessClient: { BusinessId: bs_id }
            });
            return await this.ordersRepository.save(order);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateOrder(bs_id: string, Oid: string, updateOrderDto: UpdateOrdersDto): Promise<Orders> {
        if (!bs_id || !Oid) {
            throw new Error('Business ID and Order ID are required');
        }
        const { services, products } = updateOrderDto;
        try {
            const order = await this.ordersRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, Oid: Oid },
                relations: ['businessClient', 'customer']
            });
            if (!order) {
                throw new Error('Order not found');
            }
            order.Services = services || order.Services;
            order.Products = products || order.Products;

            return await this.ordersRepository.save(order);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteOrder(bs_id: string, Oid: string): Promise<void> {
        if (!bs_id || !Oid) {
            throw new Error('Business ID and Order ID are required');
        }
        try {
            const order = await this.ordersRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, Oid: Oid },
                relations: ['businessClient']
            });
            if (!order) {
                throw new Error('Order not found');
            }
            await this.ordersRepository.remove(order);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getTop3Services(startDate: string, endDate: string, businessId: number) {
        const testQuery = `
  SELECT
    jsonb_array_elements("Services")->>'serviceid' AS service,
    COUNT(*) AS service_count
  FROM "Orders"
  WHERE "Odate" BETWEEN '2025-01-01' AND '2025-01-05'
  AND "business_id" = 1
  GROUP BY service
  ORDER BY service_count DESC
  LIMIT 3;
`;

        const results = await this.ordersRepository.query(testQuery);
        console.log(results);

        return results.map(result => ({ service: result.service, service_count: result.service_count }));
    }
    
    async calculateRevenueByCustomerType(
        businessId: string
    ): Promise<{
        newCustomerRevenue: number;
        oldCustomerRevenue: number;
        newCustomerRevenuePercentage: number;
        oldCustomerRevenuePercentage: number;
    }> {
        // Helper function to calculate revenue
        const calculateRevenue = async (isNewCustomer: boolean) => {
            const query = this.ordersRepository
                .createQueryBuilder('Orders')
                .innerJoin('Orders.customer', 'customers')
                .select('SUM(product_costs.total_cost + service_costs.total_cost)', 'total_revenue')
                .leftJoin(
                    // For product costs, flatten the products and then aggregate
                    qb =>
                        qb
                            .select('o.Oid as order_id, SUM(CAST(pe.product->>\'cost\' AS NUMERIC)) as total_cost')
                            .from('Orders', 'o')
                            .leftJoin(
                                qb => qb
                                    .select('jsonb_array_elements(o.Products) AS product')
                                    .from('Orders', 'o'),
                                'pe',
                                'pe.product IS NOT NULL'
                            )
                            .groupBy('o.Oid'),
                    'product_costs',
                    'product_costs.order_id = Orders.Oid'
                )
                .leftJoin(
                    // Similarly, for service costs, flatten the services and then aggregate
                    qb =>
                        qb
                            .select('o.Oid as order_id, SUM(CAST(se.service->>\'cost\' AS NUMERIC)) as total_cost')
                            .from('Orders', 'o')
                            .leftJoin(
                                qb => qb
                                    .select('jsonb_array_elements(o.Services) AS service')
                                    .from('Orders', 'o'),
                                'se',
                                'se.service IS NOT NULL'
                            )
                            .groupBy('o.Oid'),
                    'service_costs',
                    'service_costs.order_id = Orders.Oid'
                )
                .where('customers.business_id = :businessId', { businessId });

            if (isNewCustomer) {
                query.andWhere('customers.created_at >= NOW() - INTERVAL \'30 days\'');
            } else {
                query.andWhere('customers.created_at < NOW() - INTERVAL \'30 days\'');
            }

            const result = await query.getRawOne();
            return parseFloat(result?.total_revenue || '0');
        };

        // Calculate revenues
        const [newRevenue, oldRevenue] = await Promise.all([
            calculateRevenue(true),
            calculateRevenue(false),
        ]);

        // Calculate percentages
        const totalRevenue = newRevenue + oldRevenue;

        return {
            newCustomerRevenue: newRevenue,
            oldCustomerRevenue: oldRevenue,
            newCustomerRevenuePercentage: totalRevenue ? (newRevenue / totalRevenue) * 100 : 0,
            oldCustomerRevenuePercentage: totalRevenue ? (oldRevenue / totalRevenue) * 100 : 0,
        };
    }


}
