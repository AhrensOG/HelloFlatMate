import { Chat } from "@/db/init";
import { NextResponse } from "next/server";

export async function activateChat(chatId) {
    console.log(chatId);

    if (!chatId) {
        return NextResponse.json({ error: "No chat id provided" }, { status: 400 });
    }

    let transaction;
    try {
        // Crear la transacción correctamente con await
        transaction = await Chat.sequelize.transaction();

        const chat = await Chat.findByPk(chatId, { transaction });
        if (!chat) {
            await transaction.rollback();
            return NextResponse.json({ error: "Chat not found" }, { status: 404 });
        }

        chat.isActive = true;
        await chat.save({ transaction });
        await transaction.commit();
        return NextResponse.json({ message: "Chat activated" }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: "Error activating chat" }, { status: 500 });
    }
}

export async function desactivateChat(chatId) {
    if (!chatId) {
        return NextResponse.json({ error: "No chat id provided" }, { status: 400 });
    }

    let transaction;
    try {
        // Crear la transacción correctamente con await
        transaction = await Chat.sequelize.transaction();

        const chat = await Chat.findByPk(chatId, { transaction });
        if (!chat) {
            await transaction.rollback();
            return NextResponse.json({ error: "Chat not found" }, { status: 404 });
        }

        chat.isActive = false;
        chat.ownerId = null;
        await chat.save({ transaction });
        await transaction.commit();
        return NextResponse.json({ message: "Chat deactivated" }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: "Error deactivating chat" }, { status: 500 });
    }
}