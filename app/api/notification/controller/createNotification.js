import { Admin, Client, Notification, Owner, Worker } from "@/db/init";
import { NextResponse } from "next/server";

export async function createNotification(data) {
    try {
        if (!data) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }
        if (!data.title || data.title.trim() === "") {
            return NextResponse.json({ error: "Missing title" }, { status: 400 });
        }
        if (!data.type || data.type.trim() === "" || (data.type !== "CHAT" && data.type !== "OTHER")) {
            return NextResponse.json({ error: "Missing type or invalid type" }, { status: 400 });
        }
        if (!data.userId && (data.typeChat !== "supp" || !data.typeChat)) {
            return NextResponse.json({ error: "Missing user id" }, { status: 400 });
        }

        //buscar y almacenar el usuario que envio el mensaje
        const sender =
            (await Client.findByPk(data.senderId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Owner.findByPk(data.senderId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Admin.findByPk(data.senderId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Worker.findByPk(data.senderId, { attributes: ["id", "name", "lastName", "role"] }));

        if (!sender) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        //buscar y almacenar el usuario que recive el mensaje
        const receiver =
            (await Client.findByPk(data.userId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Owner.findByPk(data.userId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Admin.findByPk(data.userId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Worker.findByPk(data.userId, { attributes: ["id", "name", "lastName", "role"] }));

        if (!receiver) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const notif = await Notification.create({
            title: data.title,
            type: data.type,
            userId: data.userId,
            typeUser: data.typeUser,
            description: `Recibiste un mensaje de ${sender.name} ${sender.lastName}`,
            chatId: data.chatId,
            typeUser: receiver.role,
            date: new Date(),
        });
        return NextResponse.json(notif, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json(error, { status: 500 });
    }
}

export async function createSuppChatNotification(data) {
    try {
        if (!data) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }
        if (!data.title || data.title.trim() === "") {
            return NextResponse.json({ error: "Missing title" }, { status: 400 });
        }
        if (!data.type || data.type.trim() === "" || (data.type !== "CHAT" && data.type !== "OTHER")) {
            return NextResponse.json({ error: "Missing type or invalid type" }, { status: 400 });
        }
        if (!data.userId && (data.typeChat !== "supp" || !data.typeChat)) {
            return NextResponse.json({ error: "Missing user id" }, { status: 400 });
        }

        //buscar y almacenar el usuario que envio el mensaje
        const sender =
            (await Client.findByPk(data.senderId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Owner.findByPk(data.senderId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Admin.findByPk(data.senderId, { attributes: ["id", "name", "lastName", "role"] })) ||
            (await Worker.findByPk(data.senderId, { attributes: ["id", "name", "lastName", "role"] }));

        if (!sender) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (data.userId) {
            //buscar y almacenar el usuario que recive el mensaje
            const receiver =
                (await Client.findByPk(data.userId, { attributes: ["id", "name", "lastName", "role"] })) ||
                (await Owner.findByPk(data.userId, { attributes: ["id", "name", "lastName", "role"] })) ||
                (await Admin.findByPk(data.userId, { attributes: ["id", "name", "lastName", "role"] })) ||
                (await Worker.findByPk(data.userId, { attributes: ["id", "name", "lastName", "role"] }));

            if (!receiver) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const notif = await Notification.create({
                title: data.title,
                type: data.type,
                userId: data.userId,
                typeUser: data.typeUser,
                description: `Recibiste un mensaje de ${sender.name} ${sender.lastName}`,
                chatId: data.chatId,
                typeUser: receiver.role,
                date: new Date(),
            });
            return NextResponse.json(notif, { status: 200 });
        }
        return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    } catch (error) {
        console.log(error);

        return NextResponse.json(error, { status: 500 });
    }
}
