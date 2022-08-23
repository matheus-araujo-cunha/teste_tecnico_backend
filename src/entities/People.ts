import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InfoContact } from "./InfoContact";

@Entity("peoples")
export class People {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany((type) => InfoContact, (infoContact) => infoContact.people, {
    eager: true,
    cascade: ["remove"],
  })
  contacts: InfoContact[];
}
