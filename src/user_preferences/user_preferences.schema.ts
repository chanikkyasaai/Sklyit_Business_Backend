import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserPreferences extends Document {
    
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [String], default: [] })
  savedBookings: string[];

  @Prop({ type: Object, default: {} })
  preferences: Record<string, any>;

  @Prop({
    type: [
      {
        query: { type: String },
        location: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  searchHistory: { query: string; location: string; timestamp: Date }[];
}

export const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferences);