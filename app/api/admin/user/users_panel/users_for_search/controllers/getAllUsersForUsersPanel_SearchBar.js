import { Admin, Client, Owner, Worker } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllUsersForUsersPanel_SearchBar() {
  try {
    const owners = await Owner.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });
    const admins = await Admin.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });
    const workers = await Worker.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });
    const clients = await Client.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });

    return NextResponse.json([...owners, ...admins, ...workers, ...clients], {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
