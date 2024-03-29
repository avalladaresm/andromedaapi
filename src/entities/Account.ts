import {Example, Groups, Hidden, Property} from "@tsed/schema";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, Unique, UpdateDateColumn} from "typeorm";
import {BeforeDeserialize} from "@tsed/json-mapper";
import {ValidationError} from "@tsed/common";
import {AccountRole} from "./AccountRole";

@BeforeDeserialize((data: Record<string, unknown>) => {
  let error;
  if (!data.name) {
    error = new ValidationError("Validation error", [{message: "Field 'name' is required."}]);
    throw error;
  } else {
    return data;
  }
})
@Groups<Account>({
  create: [
    "name",
    "phoneNumber",
    "dob",
    "country",
    "state",
    "city",
    "email",
    "password",
    "gender",
    "identificationDocument",
    "identificationDocumentType"
  ],
  update: [
    "name",
    "phoneNumber",
    "dob",
    "country",
    "state",
    "city",
    "gender",
    "identificationDocument",
    "identificationDocumentType"
  ],
  read: [
    "id",
    "idInc",
    "accountRoles",
    "name",
    "phoneNumber",
    "dob",
    "country",
    "state",
    "city",
    "email",
    "gender",
    "identificationDocument",
    "identificationDocumentType",
    "isVerified",
    "isActive",
    "createdAt",
    "updatedAt"
  ]
})
@Entity({name: "Account"})
@Unique("UQ_id", ["id"])
@Unique("UQ_idInc", ["idInc"])
@Unique("UQ_phoneNumber", ["phoneNumber"])
@Unique("UQ_email", ["email"])
@Unique("UQ_identificationDocument", ["identificationDocument"])
export class Account {
  @Property()
  @Example("525A60BE-6AF5-EB11-B563-DC984098D2B6")
  @PrimaryColumn("uuid", {name: "id", default: () => "newid()"})
  id: string;

  @Property()
  @Example("1")
  @Column("int", {generated: "increment"})
  idInc: number;

  @Property()
  @OneToMany(() => AccountRole, (accountRoles) => accountRoles.account)
  accountRoles: AccountRole[];

  @Property()
  @Example("Daryl Schultz")
  @Column("varchar", {length: 255, nullable: false})
  name: string;

  @Property()
  @Example("+1 (933) 071-1910")
  @Column("varchar", {length: 25, nullable: false})
  phoneNumber: string;

  @Property()
  @Example("2021-07-13")
  @Column("date", {nullable: false})
  dob: string;

  @Property()
  @Example("Latvia")
  @Column("varchar", {length: 255, nullable: false})
  country: string;

  @Property()
  @Example("")
  @Column("varchar", {length: 255, nullable: true})
  state: string;

  @Property()
  @Example("")
  @Column("varchar", {length: 255, nullable: true})
  city: string;

  @Property()
  @Example("Jonas23@yahoo.com")
  @Column("varchar", {length: 255, nullable: false})
  email: string;

  @Property()
  @Hidden()
  @Column("varchar", {length: 255, nullable: false})
  password: string;

  @Property()
  @Example("Female")
  @Column("varchar", {length: 25, nullable: true})
  gender: string;

  @Property()
  @Example(false)
  @Column("bit", {default: 0})
  isVerified: boolean;

  @Property(true)
  @Example(true)
  @Column("bit", {default: 1})
  isActive: boolean;

  @Property()
  @Example("28938923")
  @Column("varchar", {length: 255, nullable: true})
  identificationDocument: string;

  @Property()
  @Example("Driver's License")
  @Column("varchar", {length: 25, nullable: true})
  identificationDocumentType: string;

  @Property()
  @Example("2021-08-05T03:27:18.690Z")
  @CreateDateColumn()
  createdAt: string;

  @Property()
  @Example("2021-10-05T03:27:18.690Z")
  @UpdateDateColumn()
  updatedAt: string;
}
