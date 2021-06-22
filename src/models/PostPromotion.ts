import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class PostPromotion extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  post_id: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ default: false })
  processed: boolean;

  constructor(postPromotion?: { post_id: string; date: Date; processed: boolean }) {
    super();
    this.post_id = postPromotion?.post_id;
    this.date = postPromotion?.date;
    this.processed = postPromotion?.processed;
  }
}
