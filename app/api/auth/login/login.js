import { Client } from "@/db/init";
import { NextResponse } from "next/server";
import { getUserById } from "../../user/controllers/getUsersController";

const login = async (req) => {
  try {
    const body = await req.json();

    const user = await (await getUserById(body.id)).json();

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      await Client.create({
        id: body.id,
        name: body.name,
        lastName: body.name,
        email: body.email,
        profilePicture: body.profile_picture,
        role: "CLIENT",
      });
      const exist = await (await getUserById(body.id)).json();

      return NextResponse.json(exist, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

module.exports = login;
