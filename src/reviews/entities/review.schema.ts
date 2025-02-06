import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
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

export const Review_Business_Schema = SchemaFactory.createForClass(Review_Business);