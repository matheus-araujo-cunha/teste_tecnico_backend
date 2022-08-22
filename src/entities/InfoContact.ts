import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { People } from "./People";
import { Contact } from "./Contact";

@Entity("infoContacts")
export class InfoContact {
    @PrimaryGeneratedColumn("uuid")
    id?:string;

    @Column({unique:true})
    info:string;

    @ManyToOne(type => People, people => people.infos )
    people: People

    @ManyToOne(type => Contact, contact => contact.infos)
    contact: Contact

}

