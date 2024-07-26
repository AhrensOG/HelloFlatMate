import { Client } from "@/db/init";
import { NextResponse } from "next/server";

const login = async (req) => {
  try {
    const body = await req.json();
    const user = await Client.findOne({ where: { email: body.email } });

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
      const exist = await Client.findOne({ where: { email: body.email } });

      return NextResponse.json(exist, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

module.exports = login;
