import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Orders } from './bsorders.entity';
import { CreateOrdersDto, UpdateOrdersDto } from './bsorders.dto';
import { Customers } from 'src/business_customers/business_customers.entity';


@Injectable()
export class BsordersService {
    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,

        @InjectRepository(Customers)
        private readonly customersRepository: Repository<Customers>,
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


    //1)ANALYTICS PART:SERVICES
    //MONTHLY THE NO OF SERVICES BOOKED
    async getTop3Services(businessId: number): Promise<{ service: string; count: number }[]> {
        const query = `
            SELECT
                jsonb_array_elements("Services")->>'sname' AS service,
                COUNT(*) AS service_count
            FROM "Orders"
            WHERE "Odate" >= NOW() - INTERVAL '30 days'
            AND "business_id" = $1
            GROUP BY service
            ORDER BY service_count DESC
            LIMIT 3;
        `;
        try {
            console.log("Query:", query);
            const topServices = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topServices);

            return topServices.map((item) => ({
                service: item.service,
                count: parseInt(item.service_count, 10),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }

    }
    async getBottom3Services(businessId: number): Promise<{ service: string; count: number }[]> {
        const query = `
            SELECT
                jsonb_array_elements("Services")->>'sname' AS service,
                COUNT(*) AS service_count
            FROM "Orders"
            WHERE "Odate" >= NOW() - INTERVAL '30 days'
            AND "business_id" = $1
            GROUP BY service
            ORDER BY service_count ASC
            LIMIT 3;
        `;
        try {
            console.log("Query:", query);
            const topServices = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topServices);

            return topServices.map((item) => ({
                service: item.service,
                count: parseInt(item.service_count, 10),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }

    }
    //REVENUE GENERATED BY THE SERVICES
    //OVER THE MONTH
    async getTop3ServicesByRevenue(businessId: number) {
        const query = `
   	 SELECT
        service,
        SUM(cost::NUMERIC) AS total_cost
    FROM (
        SELECT
            jsonb_array_elements("Services")->>'sname' AS service,
            jsonb_array_elements("Services")->>'cost' AS cost
        FROM "Orders"
        WHERE "Odate" >= NOW() - INTERVAL '30 days'
        AND "business_id" = $1
    ) subquery
    GROUP BY service
    ORDER BY total_cost DESC
    LIMIT 3;
`;
        try {
            console.log(businessId);
            console.log("Query:", query);
            const topServices = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topServices);

            return topServices.map((item) => ({
                service: item.service,
                cost: parseFloat(item.total_cost),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }
    //OVER THE Week
    async getTop3ServicesByRevenueWeek(businessId: number) {
        const query = `
   	 SELECT
        service,
        SUM(cost::NUMERIC) AS total_cost
    FROM (
        SELECT
            jsonb_array_elements("Services")->>'sname' AS service,
            jsonb_array_elements("Services")->>'cost' AS cost
        FROM "Orders"
        WHERE "Odate" >= NOW() - INTERVAL '7 days'
        AND "business_id" = $1
    ) subquery
    GROUP BY service
    ORDER BY total_cost DESC
    LIMIT 3;
`;
        try {
            console.log(businessId);
            console.log("Query:", query);
            const topServices = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topServices);

            return topServices.map((item) => ({
                service: item.service,
                cost: parseFloat(item.total_cost),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }
    //OVER THE YEAR
    async getTop3ServicesByRevenueYear(businessId: number) {
        const query = `
   	 SELECT
        service,
        SUM(cost::NUMERIC) AS total_cost
    FROM (
        SELECT
            jsonb_array_elements("Services")->>'sname' AS service,
            jsonb_array_elements("Services")->>'cost' AS cost
        FROM "Orders"
        WHERE "Odate" >= date_trunc('year', NOW())
        AND "business_id" = $1
    ) subquery
    GROUP BY service
    ORDER BY total_cost DESC
    LIMIT 3;
`;
        try {
            console.log(businessId);
            console.log("Query:", query);
            const topServices = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topServices);

            return topServices.map((item) => ({
                service: item.service,
                cost: parseFloat(item.total_cost),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }//controler need to be written

    //2)ANALYTICS PART:CUSTOMERS
    //NO OF VISITS OVER THE WEEK AND MONTH BY THE CUSTOMERS
    async getTop6CustomersBySpending(businessId: number) {
        const query = `
SELECT
    subquery."CustId",
    c."Name" AS customer_name,
    SUM(
        COALESCE((products_costs->>'cost')::NUMERIC, 0) + 
        COALESCE((services_costs->>'cost')::NUMERIC, 0)
    ) AS total
FROM (
    SELECT
        "CustId",
        jsonb_array_elements("Products") AS products_costs,
        jsonb_array_elements("Services") AS services_costs
    FROM "Orders" 
    WHERE "business_id" = $1
    AND "Odate" >= NOW() - INTERVAL '1 month'
) subquery
JOIN "Customers" c ON subquery."CustId" = c."CustId"
GROUP BY subquery."CustId", c."Name"
ORDER BY total DESC
LIMIT 6;
    `;
        try {
            console.log("Business ID:", businessId);
            console.log("Query:", query);
            const topCustomers = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topCustomers);

            return topCustomers.map((item) => ({
                customerId: item.CustId,
                customername: item.customer_name,
                totalCost: parseFloat(item.total),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }//name req
    async getBottom3CustomersBySpending(businessId: number) {
        const query = `
   SELECT
    subquery."CustId",
    c."Name" AS customer_name,
    SUM(
        COALESCE((products_costs->>'cost')::NUMERIC, 0) + 
        COALESCE((services_costs->>'cost')::NUMERIC, 0)
    ) AS total
FROM (
    SELECT
        "CustId",
        jsonb_array_elements("Products") AS products_costs,
        jsonb_array_elements("Services") AS services_costs
    FROM "Orders" 
    WHERE "business_id" = $1
    AND "Odate" >= NOW() - INTERVAL '1 month'
) subquery
JOIN "Customers" c ON subquery."CustId" = c."CustId"
GROUP BY subquery."CustId", c."Name"
ORDER BY total DESC
LIMIT 6;
    `;
        try {
            console.log("Business ID:", businessId);
            console.log("Query:", query);
            const topCustomers = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topCustomers);

            return topCustomers.map((item) => ({
                customerId: item.CustId,
                customername: item.customer_name,
                totalCost: parseFloat(item.total),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }//name req

    async getTop3VisitedCustomers(businessId: number) {
        const query = `
  SELECT
  o."CustId",
  c."Name" AS customer_name,
  COUNT(*) AS total_count
FROM "Orders" o
JOIN "Customers" c ON o."CustId" = c."CustId"
WHERE o."business_id" = $1
  AND o."Odate" >= NOW() - INTERVAL '1 month'
GROUP BY o."CustId", c."Name"
ORDER BY total_count DESC
LIMIT 3;
 `;
        try {
            console.log("Business ID:", businessId);
            console.log("Query:", query);
            const topCustomers = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topCustomers);

            return topCustomers.map((item) => ({
                customerId: item.CustId,
                customername: item.customer_name,
                totalcount: parseFloat(item.total_count),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }
    async getBottom3VisitedCustomers(businessId: number) {
        const query = `
  SELECT
  o."CustId",
  c."Name" AS customer_name,
  COUNT(*) AS total_count
FROM "Orders" o
JOIN "Customers" c ON o."CustId" = c."CustId"
WHERE o."business_id" = $1
  AND o."Odate" >= NOW() - INTERVAL '1 month'
GROUP BY o."CustId", c."Name"
ORDER BY total_count ASC
LIMIT 3;
 `;
        try {
            console.log("Business ID:", businessId);
            console.log("Query:", query);
            const topCustomers = await this.ordersRepository.query(query, [businessId]);
            console.log("Query Result:", topCustomers);

            return topCustomers.map((item) => ({
                customerId: item.CustId,
                customername: item.customer_name,
                totalcount: parseFloat(item.total_count),
            }));
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }
    // Weekly analytics with business_id
    async getWeeklyAnalytics(businessId: number) {
        const weeklyData = await this.ordersRepository.query(`
      SELECT
        date_trunc('week', "Odate") AS week_start,
        COUNT(DISTINCT "CustId") AS customer_count
      FROM "Orders"
      WHERE "Odate" >= NOW() - INTERVAL '7 days'
      AND "business_id" = $1 
      GROUP BY week_start
      ORDER BY week_start
    `, [businessId]);

        return weeklyData.map((item) => ({
            weekStart: item.week_start,
            customerCount: parseInt(item.customer_count, 10),
        }));
    }

    // Monthly analytics with business_id
    async getMonthlyAnalytics(businessId: number) {
        const monthlyData = await this.ordersRepository.query(`
      SELECT
        date_trunc('month', "Odate") AS month_start,
        COUNT(DISTINCT "CustId") AS customer_count
      FROM "Orders"
      WHERE "business_id" = $1  -- Filter by business_id
      GROUP BY month_start
      ORDER BY month_start;
    `, [businessId]);

        return monthlyData.map((item) => ({
            monthStart: item.month_start,
            customerCount: parseInt(item.customer_count, 10),
        }));
    }


    //TOTAL REVENUE AND TOTAL CUSTOMERS OVER THE MONTH
    async getMonthlyAnalytics1(businessId: number) {
        const monthlyData = await this.ordersRepository.query(`
       	SELECT
	   date_trunc('month', Odate) AS month_start,
	   COUNT(DISTINCT "CustId") AS customer_count,
	     SUM(
	        COALESCE((products_costs->>'cost')::NUMERIC, 0) + 
	        COALESCE((services_costs->>'cost')::NUMERIC, 0)
	    ) AS total
FROM (
    SELECT
	     "Odate" AS Odate,
        "CustId",
        jsonb_array_elements("Products") AS products_costs,
        jsonb_array_elements("Services") AS services_costs
    FROM "Orders"
    WHERE "business_id" = $1
    AND "Odate" >= NOW() - INTERVAL '1 month'
) subquery
   GROUP BY month_start
   ORDER BY month_start;
    `, [businessId]);

        return monthlyData.map((item) => ({
            monthStart: item.month_start,
            customerCount: parseInt(item.customer_count, 10),
            totalRevenue: parseFloat(item.total_revenue),
        }));
    }

    async getTotalCustomersAndRevenueInBusiness(businessId: number) {
        const monthlyData = await this.ordersRepository.query(`
        SELECT
    COUNT(DISTINCT "CustId") AS customer_count,
      SUM(
         COALESCE((products_costs->>'cost')::NUMERIC, 0) + 
         COALESCE((services_costs->>'cost')::NUMERIC, 0)
     ) AS total
FROM (
 SELECT
      "Odate" AS Odate,
     "CustId",
     jsonb_array_elements("Products") AS products_costs,
     jsonb_array_elements("Services") AS services_costs
 FROM "Orders"
 WHERE "business_id" = $1
) subquery;
 `, [businessId]);
        return monthlyData.map((item) => ({
            monthStart: item.month_start,
            customerCount: parseInt(item.customer_count, 10),
            totalRevenue: parseFloat(item.total_revenue),
        }));
    }
    async getNewOldCustomersRevenue(businessId: number): Promise<{ customerType: string; totalRevenue: number }[]> {
        const query = `WITH customer_status AS (
    SELECT
        c."CustId",
        CASE 
            WHEN c."created_at" >= CURRENT_DATE - INTERVAL '30 days' THEN 'new'
            ELSE 'old'
        END AS customer_type
    FROM "Customers" c
),
order_revenue AS (
    SELECT
        o."Oid",
        o."CustId",
        o."business_id",
        o."Odate",
        COALESCE(
            (SELECT SUM((s->>'cost')::numeric) FROM jsonb_array_elements(o."Services") s), 
            0
        ) +
        COALESCE(
            (SELECT SUM((p->>'cost')::numeric) FROM jsonb_array_elements(o."Products") p), 
            0
        ) AS total_amount
    FROM "Orders" o
    WHERE o."business_id" = $1
)
SELECT
    cs.customer_type,
    SUM(order_revenue.total_amount) AS total_revenue
FROM 
    order_revenue
JOIN 
    customer_status cs
ON 
    order_revenue."CustId" = cs."CustId"
GROUP BY 
    cs.customer_type;

    `;

        const result = await this.ordersRepository.query(query, [businessId]);
        return result;
    }

    async getMonthlyComparison(businessId: number, year: number, month: number)
        : Promise<{
            totalCustomers: number;
            newCustomers: number;
            totalRevenue: number;
        }> {
        const startDate = new Date(year, month - 1, 1); // Start of the month
        const endDate = new Date(year, month, 0); // End of the month

        console.log("startDate", startDate);
        console.log("endDate", endDate);
        // Query to fetch metrics
        const totalCustomersQuery = `
  SELECT COUNT(DISTINCT "CustId") AS "totalCustomers"
  FROM "Orders"
  WHERE "business_id" = $1
    AND "Odate" BETWEEN $2 AND $3;
`;
        let totalCustomers = 0;
        try {
            totalCustomers = await this.ordersRepository.query(totalCustomersQuery, [businessId, startDate, endDate]);
        } catch (error) {
            console.log("Total customers from orders", error);
        }
        const newCustomersQuery = `
  SELECT COUNT(DISTINCT c."CustId")
FROM "Customers" c
JOIN "Orders" o ON c."CustId" = o."CustId"
WHERE c."business_id" = $1
  AND c."created_at">= NOW() - INTERVAL '1 month'
  AND o."business_id" = $1
  AND o."Odate" BETWEEN $2 AND $3;
`;
        let newCustomers = 0;
        try {
            newCustomers = await this.customersRepository.query(newCustomersQuery, [businessId, startDate, endDate]);
        }
        catch (error) {
            console.log("new customer ", error);
        }
        const totalRevenueQuery = `
  SELECT COALESCE(
            (SELECT SUM((s->>'cost')::numeric) FROM jsonb_array_elements("Services") s),
            0
        ) +
        COALESCE(
            (SELECT SUM((p->>'cost')::numeric) FROM jsonb_array_elements("Products") p),
            0
        )  AS "totalRevenue"
  FROM "Orders"
  WHERE "business_id" = $1
    AND "Odate" BETWEEN $2 AND $3;
`;
        let totalRevenue = 0;
        try {
            totalRevenue = await this.ordersRepository.query(totalRevenueQuery, [businessId, startDate, endDate]);
        }
        catch (error) {
            console.log("total revenue ", error);
        }
        const results = {
            totalCustomers: totalCustomers[0]?.totalCustomers || 0,
            newCustomers: newCustomers[0]?.newCustomers || 0,
            totalRevenue: totalRevenue[0]?.totalRevenue || 0,
        };

        return results;

    }

    async getPastServices(businessId: number, CustId: number) {
        const query = `
            SELECT 
                jsonb_array_elements("Services")->>'sname' AS service,
                "Odate"
            FROM "Orders"
            WHERE "business_id" = $1
            AND "CustId" = $2
        `;
        const result = await this.ordersRepository.query(query, [businessId, CustId]);
        return result.map((item) => ({
            services:item.service,
            date:item.Odate
        }));

    }
}

