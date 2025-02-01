import { Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class Review_Business extends Document{

    @Prop()
    review: string
    
    @Prop()
    rating: number

    @Prop()
    businessId: string
    
    @Prop()
    serviceId: string
    
    @Prop()
    CustId:string
}
