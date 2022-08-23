import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InfoContact } from "./InfoContact";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  contact: string;

  @OneToMany((type) => InfoContact, (infoContact) => infoContact.name, {
    cascade: ["remove"],
  })
  infos: InfoContact[];
}
