import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn} from 'typeorm';

@Entity('mailsave')
export class MailSave {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  fromEmail!: string;

  @Column({ length: 255 })
  toEmail!: string;

  @Column({ length: 255 })
  subject!: string;

  @Column({ type: 'longtext' })
  messageBody!: string;

  @Column({ default: true })
  isSent!: boolean;

  @CreateDateColumn()
  sentAt!: Date;
}