import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("users_tokens")
class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserTokens };