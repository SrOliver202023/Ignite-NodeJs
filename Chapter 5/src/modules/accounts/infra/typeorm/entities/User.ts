import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "getAvatarUrl" })
  avatar_url(): string {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }

  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };